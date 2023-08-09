<?php

namespace App\Controller\Auth;

use App\Controller\AbstractAPIController;
use App\Entity\User;
use App\Security\ApiTokenHandler;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[OA\Tag(name: 'Auth')]
class LoginController extends AbstractAPIController
{
    #[OA\RequestBody(
        content: new OA\JsonContent(
            type: 'object',
            properties: [
                new OA\Property('username', type: 'string'),
                new OA\Property('password', type: 'string'),
            ],
        )
    )]
    
    #[OA\Response(
        response: 200,
        description: 'Successful login',
        content: new OA\JsonContent(
            type: 'object',
            properties: [new OA\Property('token', type: 'string')],
        )
    )]

    #[Route('/auth/login', name: 'app_auth_login', methods: ['POST'])]
    public function login(#[CurrentUser()] User $user = null, ApiTokenHandler $apiTokenHandler, Request $request, ValidatorInterface $validator): JsonResponse
    {
        if(!$user) {
            return $this->json([
                'error' => 'Invalid login request: check that the Content-Type header is "application/json".',
            ], Response::HTTP_UNAUTHORIZED);
        }


        $apiToken = $apiTokenHandler->createForUser($user);

        return $this->response([
            'apiToken' => $apiToken,
            'iri' => $user->getIriFromResource(),
        ]);
    }

    #[Route('/auth/logout', name: 'app_auth_logout', methods: ['POST'])]
    public function logout(): void
    {
        throw new \Exception('Logout failed?'); 
    }
}
