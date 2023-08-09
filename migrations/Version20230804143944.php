<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230804143944 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE verification_token (id INT AUTO_INCREMENT NOT NULL, owned_by_id INT DEFAULT NULL, is_validated TINYINT(1) DEFAULT NULL, token VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_C1CC006B5E70BCD7 (owned_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE verification_token ADD CONSTRAINT FK_C1CC006B5E70BCD7 FOREIGN KEY (owned_by_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE verification_token DROP FOREIGN KEY FK_C1CC006B5E70BCD7');
        $this->addSql('DROP TABLE verification_token');
    }
}
