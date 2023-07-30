<?php

namespace App\Controller\Authorization;

use App\Controller\AbstractAPIController;
use App\Entity\User;
use App\Repository\UserRepository;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[OA\Tag(name: 'Users')]
#[Route('/api/users', name: 'app_users_')]
class UserController extends AbstractAPIController
{
    // #[OA\Response(
    //     response: 200,
    //     description: 'Successful response',
    //     content: new OA\JsonContent(
    //         type: 'array',
    //         items: new OA\Items(ref: new Model(type: User::class))
    //     )
    // )]

    #[IsGranted('ROLE_ADMIN')]
    #[Route('', name: 'index', methods: ['GET'])]
    public function index(UserRepository $userRepository): JsonResponse
    {
        return $this->response($userRepository->findAll(), ['user:all']);
    }
}
