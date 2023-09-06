<?php

namespace App\Controller\Editor;

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
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;


#[OA\Tag(name: 'Articles')]
#[Route('/api/editor', name: 'app_editor_articles')]
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

    #[IsGranted('ROLE_EDITOR')]
    #[Route('/articles', name: ':index', methods: ['GET'])]
    public function index(ArticleRepository $articleRepository): JsonResponse
    {
        return $this->response($articleRepository->findAll(), ['article:read:private', 'comment:read']);
    }

    // #[OA\Response(
    //     response: 200,
    //     description: 'Successful response',
    //     content: new Model(type: Article::class)
    // )]
    #[IsGranted('ROLE_EDITOR')]
    #[Route('/articles', name: ':create', methods: ['POST'])]
    public function create(ArticleRepository $articleRepository, ValidatorInterface $validator, Request $request): JsonResponse
    {
        $article = $this->deserialize($request->getContent(), Article::class, 'json', []);

        $errors = $validator->validate($article);
        
        if(count($errors) > 0) {
            return $this->json($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $articleRepository->save($article, true);

        return $this->response($article,['article:write'], Response::HTTP_CREATED);
    }


    // #[IsGranted('ROLE_EDITOR')]
    // #[Route('/{slug}', name: '.show', methods: ['GET'])]
    // public function show(Article $article): JsonResponse
    // {
    //     return $this->response($article);
    // }

    #[IsGranted('ROLE_EDITOR')]
    #[Route('/{id}', name: ':update', methods: ['PATCH'])]
    public function update(ArticleRepository $articleRepository, Article $article, ValidatorInterface $validator, Request $request): JsonResponse
    {
        $article = $this->deserialize($request->getContent(), Article::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $article,
        ]);

        $errors = $validator->validate($article);
        
        if(count($errors) > 0) {
            return $this->json($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $articleRepository->save($article, true);

        return $this->response($article, ['article:write']);
    }

    #[IsGranted('ROLE_EDITOR')]
    #[Route('/{id}', name: ':delete', methods: ['DELETE'])]
    public function delete(ArticleRepository $articleRepository, Article $article): JsonResponse
    {
        $articleRepository->remove($article, true);
        
        return $this->response('', [], Response::HTTP_NO_CONTENT);
    }
}
