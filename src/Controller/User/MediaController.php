<?php

namespace App\Controller\User;

use App\Controller\AbstractAPIController;
use App\Entity\Media;
use App\Entity\User;
use App\Repository\MediaRepository;
use App\Service\UploaderHelper;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use OpenApi\Attributes as OA;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\Normalizer\DataUriNormalizer;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\FileValidator;
use Symfony\Component\Validator\Constraints\NotBlank;


#[OA\Tag(name: 'Articles Comments')]
#[Route('/api/media', name: 'app_media')]
class MediaController extends AbstractAPIController
{
    #[Route('', name: ':index', methods: ['GET'])]
    public function index(MediaRepository $mediaRepository): Response
    {
        $media = $mediaRepository->findAll();

        return $this->response(['media' => $media], ['media:read']);
    }

    #[Route('', name: ':create', methods: ['POST'])]
    public function create(Request $request, MediaRepository $mediaRepository, #[CurrentUser()] User $user, UploaderHelper $uploaderHelper)
    {
        $file = $request->files->get('file');

        // $this->validate([
        //     'file' => [
        //         new NotBlank(),
        //         new FileValidator()
        //     ],
        // ], $file);

        // $filesystem = new Filesystem();
        if($file) {
            $filename = $uploaderHelper->uploadImage($file, $this->getUploadsDir());
            
            $media = new Media();
            $media->setName($file->getClientOriginalName());
            $media->setFileName($filename);
            $media->setMimeType('type');
            $media->setSize(250);
            $media->setFilePath('/uploads/' . $filename);
            $media->setAuthor($user);

            $mediaRepository->save($media, true);

            $previewUrl = $request->getUriForPath(
                $media->getFilePath()
            );

            return $this->response([
                    'file' => [
                    'id' => $media->getId(),
                    'preview_url' => $previewUrl,
                    'name' => $media->getName(),
                    'file_name' => $media->getFileName(),
                    'mime_type' => $media->getMimeType(),
                    'size' => $media->getSize(),
                    'author' => [
                        'id' => $media->getAuthor()->getId(),
                        'name' => $media->getAuthor()->getUsername(),
                    ],
                    'created_at' => $media->getCreatedAt()->format('d/m/Y'),
                ],
                'flash' => [
                    'message' => 'The file has been added.',
                    'type' => 'success'
                ]
            ]);
        }

        return $this->json([
            'flash' => [
                'message' => 'Coś poszło nie tak. Plik nie został przesłany.',
                'type' => 'error'
            ]
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/with-cropper', name: ':cropper', methods: ['POST'])]
    public function createWithCropper(Request $request)
    {
        $data = $request->toArray();

        // $this->validate([
        //     'image' => [
        //         new NotBlank(),
        //         new FileValidator()
        //     ],
        // ], $data);

        $filesystem = new Filesystem();
        // $filesystem->remove();
        return $this->response(['media' => $data]);
    }

    public function update(Media $media, Request $request)
    {
        $data = $request->toArray();

        // $this->validate([
        //     'image' => [
        //         new NotBlank(),
        //         new FileValidator()
        //     ],
        // ], $data);

        // if(!is_null($media)) {
        //     $filesystem = new Filesystem();
        //     $filesystem->remove(
        //         // $this->getUploadsDir() . $media->getFileName()
        //     );
        // }
        return $this->response(['media' => $data]);
    }

    private function getUploadsDir()
    {
        return $this->getParameter('uploads_dir');
    }

    private function removeFile(Media $media)
    {
        $filesystem = new Filesystem();

        // $filesystem->remove(
        //     // $this->getUploadsDir() . $media->getFileName()
        // );
    }
}
