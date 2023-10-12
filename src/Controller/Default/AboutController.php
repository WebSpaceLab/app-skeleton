<?php

namespace App\Controller\Default;

use App\Controller\AbstractAPIController;
use App\Repository\AboutRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/about', name: 'app_about')]
class AboutController extends AbstractAPIController
{
    #[Route('', name: ':index', methods: ['GET'])]
    public function index(AboutRepository $aboutRepository): Response
    {
        $about =  $aboutRepository->getActiveAbout();
        return $this->response([
            'about' => $about,
        ], ['about:read']);
    }
}
