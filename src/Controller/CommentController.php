<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Comment;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/comments', name: 'app_comment_')]
class CommentController extends AbstractAPIController
{
    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(CommentRepository $commentRepository, ValidatorInterface $validator, Request $request): JsonResponse
    {
        $comment = $this->validated($request->getContent(), Comment::class);

        $errors = $validator->validate($comment);
        
        if(count($errors) > 0) {
            return $this->json($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $commentRepository->save($comment, true);

        return $this->response($comment, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Comment $comment): JsonResponse
    {
        return $this->response($comment);
    }

    #[Route('/{id}', name: 'update', methods: ['PATCH'])]
    public function update(CommentRepository $commentRepository, Comment $comment, ValidatorInterface $validator, Request $request): JsonResponse
    {
        $comment = $this->validated($request->getContent(), Article::class, $comment, 'PATCH');

        $errors = $validator->validate($comment);
        
        if(count($errors) > 0) {
            return $this->json($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $commentRepository->save($comment, true);

        return $this->response($comment);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(CommentRepository $articleRepository, Comment $comment): JsonResponse
    {
        $articleRepository->remove($comment, true);
        return $this->response('', Response::HTTP_NO_CONTENT);
    }
}
