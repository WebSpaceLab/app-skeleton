<?php

namespace App\Controller\Default;

use App\Controller\AbstractAPIController;
use App\Repository\FeatureRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/feature', name: 'app_feature')]
class FeatureController extends AbstractAPIController
{
    #[Route('', name: ':index', methods: ['GET'])]
    public function index(FeatureRepository $featureRepository): Response
    {
        $feature =  $featureRepository->getActiveFeature();
        return $this->response([
            'feature' => $feature,
        ], ['feature:read']);
    }
}
