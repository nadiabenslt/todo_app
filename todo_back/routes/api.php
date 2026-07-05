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
    Route::put('/tasks/modifiy/{id}', [TaskController::class, 'modifiy']);
    Route::delete('/tasks/remove/{id}', [TaskController::class, 'remove']);
    Route::get('/tasks/{id}', [TaskController::class, 'getById']);
    Route::put('/tasks/{id}/statut', [TaskController::class, 'statutTask']);
    Route::post('/logout',[UserController::class,'logout']);
});