<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
class TaskController extends Controller
{
    public function index(Request $request){
        $query = auth()->user()->tasks();

        if ($request->has('statut') && $request->statut !== 'all') {
            $query->where('statut', $request->statut);
        }

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('start_date') && !empty($request->start_date)) {
            $query->where('date', '>=', $request->start_date);
        }

        if ($request->has('end_date') && !empty($request->end_date)) {
            $query->where('date', '<=', $request->end_date);
        }

        $tasks = $query->get();
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
    public function modifiy(Request $req){
        $task=Task::find($req->id);
        $validated = $req->validate([
        "title" => "required|max:200",
        "description" => "nullable|max:255",
        "date" => "required|date",
    ]);
    $task->update($validated);
    return response()->json(["task" => $task], 200);
    }
    public function remove(Request $req){
        Task::find($req->id)->delete();
        return response()->json(["message"=>"task deleted successfuly"], 200);
    }
    public function getById(Request $req){
        $task=Task::find($req->id);
        return response()->json(["task"=>$task], 200);   
        }
    public function statutTask(Request $req,$id){
        $task=Task::findOrFail($id)->update(['statut'=>$req->statut]);
        return response()->json(["message"=>"done"], 200);
    }
    
}
