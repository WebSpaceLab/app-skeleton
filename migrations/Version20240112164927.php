<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240112164927 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE advertisement ADD adding_id INT DEFAULT NULL, ADD description LONGTEXT DEFAULT NULL, ADD image_url VARCHAR(255) NOT NULL, ADD target_url VARCHAR(255) DEFAULT NULL, ADD start_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD end_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD status VARCHAR(55) NOT NULL, ADD price NUMERIC(10, 2) NOT NULL, ADD clicks INT NOT NULL, ADD page_paths JSON DEFAULT NULL, ADD ad_positions JSON DEFAULT NULL, DROP url, DROP position, DROP is_active');
        $this->addSql('ALTER TABLE advertisement ADD CONSTRAINT FK_C95F6AEEB04103D8 FOREIGN KEY (adding_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_C95F6AEEB04103D8 ON advertisement (adding_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE advertisement DROP FOREIGN KEY FK_C95F6AEEB04103D8');
        $this->addSql('DROP INDEX IDX_C95F6AEEB04103D8 ON advertisement');
        $this->addSql('ALTER TABLE advertisement ADD position VARCHAR(255) DEFAULT NULL, ADD is_active TINYINT(1) NOT NULL, DROP adding_id, DROP description, DROP image_url, DROP start_at, DROP end_at, DROP status, DROP price, DROP clicks, DROP page_paths, DROP ad_positions, CHANGE target_url url VARCHAR(255) DEFAULT NULL');
    }
}
