<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploaderHelper
{
    public function uploadImage(UploadedFile $uploadedFile, string $uploadsPath): string
    {
        $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $newFilename = $originalFilename  . '-' .md5(uniqid()) . '.' . $uploadedFile->guessExtension();

        $uploadedFile->move(
            $uploadsPath,
            $newFilename
        );

        return $newFilename;
    }
}