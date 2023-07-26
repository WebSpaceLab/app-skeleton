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
    // public function __construct(
    //     private SerializerInterface $serializer
    // ) {}
    protected SerializerInterface $serializer;

    public function response( mixed $data, int $status = 200, array $headers = [], array $context = []): JsonResponse
    {
        if(count($context) == 0) {
            $context = [
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER=> function ($object) {
                    return $object->getId(); 
                }
            ];
        }

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

    public function validated(mixed $requestData, string $type = '', mixed $object = [], string $method = 'POST'): mixed
    {
        switch ($method) {
            case 'POST':
                $data = $this->deserialize($requestData, $type, 'json', []);
                break;

            case 'PATCH':
                $data = $this->deserialize($requestData, $type, 'json', [
                     AbstractNormalizer::OBJECT_TO_POPULATE => $object
                ]);
                break;

            case 'PUT':
                $data = $this->deserialize($requestData, $object::class, 'json', [
                    AbstractNormalizer::OBJECT_TO_POPULATE => $object
                ]);
                break;
            
            default:
                # code...
                break;
        }

        return $data;
    }

    public function preData()
    {

    }

    #[Required]
    public function setServices(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }
}
