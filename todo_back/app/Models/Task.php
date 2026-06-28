<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Task;

class Task extends Model
{
    use HasApiTokens ;
    protected $fillable=['title','description','date','statut','user_id'];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
