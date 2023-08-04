<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * @param LoginRequest $request
     * @return Response|JsonResponse
     * @throws ValidationException
     */
    public function login(LoginRequest $request): Response|JsonResponse
    {
        $data = $request->validated();
        $user = User::where('email',$data['email'])->first();
        if(!$user || !Hash::check($data['password'],$user->password)){
            return response([
                'message' => 'Bad credentials'
            ],401);
        }
        $token = $user->createToken('deschide_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();
        $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out'
        ])->withCookie($cookie);

    }

    public function user(Request $request)
    {
        return response()->json([
            'user' => new UserResource($request->user())
        ]);
    }
}
