<?php

namespace App\Controller\Auth;

use App\Entity\User;
use App\Security\ApiTokenHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class LoginController extends AbstractController
{
    #[Route('/auth/login', name: 'app_auth_login')]
    public function login(#[CurrentUser()] User $user = null, ApiTokenHandler $apiTokenHandler): JsonResponse
    {
        if(!$user) {
            return $this->json([
                'error' => 'Invalid login request: check that the Content-Type header is "application/json".',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $apiToken = $apiTokenHandler->createForUser($user);

        return $this->json([
            'apiToken' => $apiToken
        ], Response::HTTP_OK);
    }
}
