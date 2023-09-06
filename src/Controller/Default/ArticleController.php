<?php

namespace App\Controller\Default;

use App\Controller\AbstractAPIController;
use App\Entity\Article;
use OpenApi\Attributes as OA;
use App\Repository\ArticleRepository;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[OA\Tag(name: 'Articles')]
#[Route('/api/articles', name: 'app_article')]
class ArticleController extends AbstractAPIController
{
    // #[OA\Response(
    //     response: 200,
    //     description: 'Successful response',
    //     content: new OA\JsonContent(
    //         type: 'array',
    //         items: new OA\Items(ref: new Model(type: Article::class))
    //     )
    // )]

    #[Route('', name: ':index', methods: ['GET'])]
    public function index(ArticleRepository $articleRepository): JsonResponse
    {
        return $this->response($articleRepository->findAll(), ['article:read']);
    }

    // #[OA\Response(
        
    //     response: 200,
    //     description: 'Successful response',
    //     content: new Model(type: Article::class)
    // )]
    #[Route('/{slug}', name: ':show', methods: ['GET'])]
    public function show(Article $article): JsonResponse
    {
        return $this->response($article, ['article:show']);
    }
}
