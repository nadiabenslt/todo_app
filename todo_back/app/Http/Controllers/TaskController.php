<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
class TaskController extends Controller
{
    public function index(){
        $tasks=auth()->user()->tasks;
         return response()->json(["tasks"=>$tasks], 200);
    }
    public function store(Request $req){
        $validated=$req->validate([
            "title"=>"required|max:200",
            "description"=>"max:255|nullable",
            "date"=>"required|date"
        ]);
         $validated['statut'] = 'To Do';
    $validated['user_id'] = auth()->id();
        $task=Task::create($validated);
        return response()->json($task, 201);
    }
}
