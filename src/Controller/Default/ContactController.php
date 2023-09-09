<?php

namespace App\Controller\Default;

use App\Controller\AbstractAPIController;
use App\Repository\ContactRepository;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[OA\Tag(name: 'Contact')]
#[Route('/api/contacts', name: 'app_contact')]
class ContactController extends AbstractAPIController
{
    #[Route('', name: ':index', methods: ['GET'])]
    public function index(ContactRepository $contactRepository): Response
    {
        $contact = $contactRepository->findAll();
        return $this->response(['contact' => $contact], ['content:read']);
    }
}
