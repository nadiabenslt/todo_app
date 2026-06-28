<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Auth\Events\Registered;


class UserController extends Controller
{
    public function register(Request $req){
        $user=User::create([
            "name"=>$req->name,
            "email"=>$req->email,
            "password"=>Hash::make($req->password),
        ]);
        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json(["user"=>$user,"token"=>$token], 201);
    }
    public function logout(){
        $user=auth()->user();
        $user->currentAccessToken()->delete();
        $msg="logout successfuly";
        return response()->json(["message"=>$msg], 200);
    }
    public function login(Request $req){
        $credentials=$req->validate([
            "email"=>["required","email"],
            "password"=>["required"]
        ]);
        $user=User::where('email',$credentials["email"])->first();
        if(!$user || !Hash::check($credentials["password"], $user->password)){
            return response()->json(["message"=>"email or password incorrecte"], 401);
        }
        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json(["user"=>$user,"token"=>$token], 200);
    }
}
