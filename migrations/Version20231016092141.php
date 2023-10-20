<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231016092141 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE price (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, subtitle VARCHAR(255) DEFAULT NULL, is_active TINYINT(1) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE price_package (id INT AUTO_INCREMENT NOT NULL, price_list_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, is_highlighted TINYINT(1) NOT NULL, price VARCHAR(255) DEFAULT NULL, action_url VARCHAR(255) DEFAULT NULL, name_btn VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_B54EAFC95688DED7 (price_list_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE price_package_information (id INT AUTO_INCREMENT NOT NULL, price_package_id INT DEFAULT NULL, info VARCHAR(255) NOT NULL, is_highlighted TINYINT(1) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_5ACCB4B340C4A4FB (price_package_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE price_package ADD CONSTRAINT FK_B54EAFC95688DED7 FOREIGN KEY (price_list_id) REFERENCES price (id)');
        $this->addSql('ALTER TABLE price_package_information ADD CONSTRAINT FK_5ACCB4B340C4A4FB FOREIGN KEY (price_package_id) REFERENCES price_package (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE price_package DROP FOREIGN KEY FK_B54EAFC95688DED7');
        $this->addSql('ALTER TABLE price_package_information DROP FOREIGN KEY FK_5ACCB4B340C4A4FB');
        $this->addSql('DROP TABLE price');
        $this->addSql('DROP TABLE price_package');
        $this->addSql('DROP TABLE price_package_information');
    }
}
