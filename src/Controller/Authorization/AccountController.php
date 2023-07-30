<?php

namespace App\Controller\Authorization;

use App\Controller\AbstractAPIController;
use App\Entity\User;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[OA\Tag(name: 'Account')]
#[Route('/api/profile', name: 'dashboard-profile', methods: ["GET"])]
class AccountController extends AbstractAPIController
{
    #[IsGranted('ROLE_USER')]
    #[Route('/{id}', name: ':show')]
    public function show(#[CurrentUser()] User $user = null): JsonResponse
    {
        return $this->response($user, ['profile:read']);
    }
}
