<?php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\AccessToken\AccessTokenHandlerInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;

class ApiTokenHandler implements AccessTokenHandlerInterface {
    public function __construct()
    {
    }

    public function createForUser(User $user) 
    {
        $SessionToken = session_create_id('atp');

        $accessToken = $SessionToken.bin2hex(random_bytes(64));  
        dd($accessToken);
        //  $accessToken3*60*60 $user->getUserIdentifier();

        return $accessToken;
    }

    public function getUserBadgeFrom(string $accessToken): UserBadge
    {
        dd( $accessToken);
        // // $userId = $this->redis->get('sessions/' . $accessToken);
        // if (!$userId) {
        //     throw new BadCredentialsException('Invalid token');
        // }

        // return new UserBadge($userId);
    }
}
