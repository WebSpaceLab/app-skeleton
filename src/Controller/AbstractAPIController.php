<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\Service\Attribute\Required;


abstract class AbstractAPIController extends AbstractController
{
    protected SerializerInterface $serializer;

    public function response( mixed $data, array $groups = [], int $status = 200, array $headers = []): JsonResponse
    {
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => $groups,
        ];

        return $this->json(
            $data,
            $status,
            $headers,
            $context
        );
    }

    public function deserialize(
         mixed $data,
        string $type,
        string $format,
        array $context = []
    ): mixed
    {
        return $this->serializer->deserialize( 
            $data,
            $type,
            $format,
            $context
        );
    }

    public function redirectToFrontendRoute(string $routeName, int $status = 302)
    {
        $frontendUrl = $_ENV['FRONTEND_URL'];
        // $url = $this->generateUrl($routeName);
        $fullUrl = $frontendUrl . $routeName;
    
        return $this->redirect($fullUrl, $status);
    }

    #[Required]
    public function setServices(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }
}
