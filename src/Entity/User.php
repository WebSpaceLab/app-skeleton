<?php

namespace App\Entity;

use App\Repository\UserRepository;
use App\Trait\Timestamps;
use Carbon\Carbon;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\HasLifecycleCallbacks()]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use Timestamps;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank()]
    #[Assert\Email()]
    #[Groups(['profile:read', 'user:all', 'article:read'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['profile:read', 'user:all'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['profile:read', 'user:all', 'article:read', 'profile:write'])]
    private ?string $username = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['profile:read', 'user:all', 'article:read', 'profile:write'])]
    private ?string $bio = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['profile:read', 'user:all', 'article:read', 'profile:write'])]
    private ?string $avatarUrl = null;

    #[ORM\Column]
    #[Groups(['user:all'])]
    private ?bool $isActiveAccount = false;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['profile:read', 'profile:write'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['profile:read', 'profile:write'])]
    private ?string $lastName = null;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Article::class)]
    #[Groups(['profile:read'])]
    private Collection $articles;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Comment::class)]
    #[Groups(['profile:read'])]
    private Collection $comments;

    #[ORM\OneToOne(mappedBy: 'ownedBy', cascade: ['persist'])]
    private ?ApiToken $apiToken = null;

    #[ORM\OneToOne(mappedBy: 'ownedBy', cascade: ['persist', 'remove'])]
    private ?VerificationToken $verificationToken = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->articles = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(?string $bio): static
    {
        $this->bio = $bio;

        return $this;
    }

    public function getAvatarUrl(): ?string
    {
        $avatarUrl = $this->avatarUrl;

        if($avatarUrl) {
            return $this->avatarUrl;
        }

        return 'https://localhost:8000/user-placeholder.png';
    }

    public function setAvatarUrl(?string $avatarUrl): static
    {
        $this->avatarUrl = $avatarUrl;

        return $this;
    }

    public function isActiveAccount(): ?bool
    {
        return $this->isActiveAccount;
    }

    public function setIsActiveAccount(bool $isActiveAccount): static
    {
        $this->isActiveAccount = $isActiveAccount;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): static
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->setOwner($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): static
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getOwner() === $this) {
                $article->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setOwner($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getOwner() === $this) {
                $comment->setOwner(null);
            }
        }

        return $this;
    }
   
    public function getApiToken(): ?ApiToken
    {
        return $this->apiToken;
    }

    public function setApiToken(?ApiToken $apiToken): static
    {
        // unset the owning side of the relation if necessary
        if ($apiToken === null && $this->apiToken !== null) {
            $this->apiToken->setOwnedBy(null);
        }

        // set the owning side of the relation if necessary
        if ($apiToken !== null && $apiToken->getOwnedBy() !== $this) {
            $apiToken->setOwnedBy($this);
        }

        $this->apiToken = $apiToken;

        return $this;
    }
    
    #[Groups(['profile:read'])]
    public function getIriFromResource()
    {
        return '/api/profile/' . $this->getId();
    }

    #[Groups(['profile:read'])]
    public function getApiTokenExpiresAt()
    {
        return Carbon::instance($this->apiToken->getExpiresAt())->toDateTimeString();
    }


    #[Groups(['profile:read'])]
    public function getCreatedAtAgo(): ?string
    {
        return  Carbon::instance($this->createdAt)->diffForHumans();
    }

    #[Groups(['profile:read'])]
    public function getUpdatedAtAgo(): ?string
    {
        $updatedAtAgo = $this->updatedAt;

        if ($updatedAtAgo) {
            $updatedAtAgo = Carbon::instance($updatedAtAgo)->diffForHumans();
        }

        return  $updatedAtAgo;
    }

    public function getVerificationToken(): ?VerificationToken
    {
        return $this->verificationToken;
    }

    public function setVerificationToken(?VerificationToken $verificationToken): static
    {
        // unset the owning side of the relation if necessary
        if ($verificationToken === null && $this->verificationToken !== null) {
            $this->verificationToken->setOwnedBy(null);
        }

        // set the owning side of the relation if necessary
        if ($verificationToken !== null && $verificationToken->getOwnedBy() !== $this) {
            $verificationToken->setOwnedBy($this);
        }

        $this->verificationToken = $verificationToken;

        return $this;
    }
}
