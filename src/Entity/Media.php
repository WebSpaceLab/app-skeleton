<?php

namespace App\Entity;

use App\Repository\MediaRepository;
use App\Trait\Timestamps;
use Carbon\Carbon;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MediaRepository::class)]
#[ORM\HasLifecycleCallbacks()]
class Media
{
    use Timestamps;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['media:read', 'admin:media:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['media:read','admin:media:read'])] 
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['media:read', 'admin:media:read'])] 
    private ?string $fileName = null; /* TODO: dodać unique */

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['media:read', 'admin:media:read'])]
    private ?string $mimeType = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $filePath = null;

    #[ORM\Column(type: Types::INTEGER, nullable: true)]
    #[Groups(['media:read', 'admin:media:read'])]
    private ?int $size = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['media:read', 'admin:media:read'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'media')]
    private ?User $author = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['admin:media:read'])]
    private ?bool $isDelete = false;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['media:read', 'admin:media:read'])]
    private ?string $movieUrl = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['admin:media:read'])]
    private ?bool $isUsed = false;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(string $fileName): static
    {
        $this->fileName = $fileName;

        return $this;
    }

    public function getMimeType(): ?string
    {
        return $this->mimeType;
    }

    public function setMimeType(string $mimeType): static
    {
        $this->mimeType = $mimeType;

        return $this;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(string $filePath): static
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    #[Groups(['media:read', 'admin:media:read'])]
    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): static
    {
        $this->author = $author;

        return $this;
    }

    #[Groups(['media:read', 'admin:media:read'])]
    public function getCreatedAtAgo(): ?string
    {
        return  Carbon::instance($this->createdAt)->diffForHumans();
    }

    #[Groups(['media:read', 'admin:media:read'])]
    public function getUpdatedAtAgo(): ?string
    {
        $updatedAtAgo = $this->updatedAt;

        if ($updatedAtAgo) {
            $updatedAtAgo = Carbon::instance($updatedAtAgo)->diffForHumans();
        }

        return  $updatedAtAgo;
    }

    #[Groups(['media:read', 'admin:media:read'])]
    public function getPreviewUrl(): ?string
    {
        return 'https://localhost:8000' . $this->filePath;
    }

    public function setPreviewUrl($url): self
    {
        $this->filePath = $url;

        return $this;
    }

    public function isIsDelete(): ?bool
    {
        return $this->isDelete;
    }

    public function setIsDelete(?bool $isDelete): static
    {
        $this->isDelete = $isDelete;

        return $this;
    }

    public function getMovieUrl(): ?string
    {
        return $this->movieUrl;
    }

    public function setMovieUrl(?string $movieUrl): static
    {
        $this->movieUrl = $movieUrl;

        return $this;
    }

    public function isIsUsed(): ?bool
    {
        return $this->isUsed;
    }

    public function setIsUsed(?bool $isUsed): static
    {
        $this->isUsed = $isUsed;

        return $this;
    }
}
