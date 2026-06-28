<?php
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::post('/register',[UserController::class , 'register']);
Route::post('/login',[UserController::class , 'login']);
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::post('/logout',[UserController::class,'logout']);
});