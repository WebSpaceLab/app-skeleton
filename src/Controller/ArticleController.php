<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/articles', name: 'app_article_')]
class ArticleController extends AbstractAPIController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(ArticleRepository $articleRepository): JsonResponse
    {
        return $this->response($articleRepository->findAll(), Response::HTTP_OK);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    #[IsGranted('ROLE_EDITOR')]
    public function create(ArticleRepository $articleRepository, ValidatorInterface $validator, Request $request): JsonResponse
    {
        $article = $this->validated($request->getContent(), Article::class);
        $errors = $validator->validate($article);
        
        if(count($errors) > 0) {
            return $this->json($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $articleRepository->save($article, true);

        return $this->response($article, Response::HTTP_CREATED);
    }

    #[Route('/{slug}', name: 'show', methods: ['GET'])]
    public function show(Article $article): JsonResponse
    {
        return $this->response($article);
    }

    #[IsGranted('ROLE_EDITOR')]
    #[Route('/{id}', name: 'update', methods: ['PATCH'])]
    public function update(ArticleRepository $articleRepository, Article $article, ValidatorInterface $validator, Request $request): JsonResponse
    {
        $article = $this->validated($request->getContent(), Article::class, $article, 'PATCH');

        $errors = $validator->validate($article);
        
        if(count($errors) > 0) {
            return $this->json($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $articleRepository->save($article, true);

        return $this->response($article);
    }

    #[IsGranted('ROLE_EDITOR')]
    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(ArticleRepository $articleRepository, Article $article): JsonResponse
    {
        $articleRepository->remove($article, true);
        
        return $this->response('', Response::HTTP_NO_CONTENT);
    }
}
