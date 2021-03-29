<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chanson;

class Chansons extends Controller
{
    public function create(Request $request){
        
        $chanson = new Chanson;        
        $chanson->titre = $request->titre;
        $chanson->album = $request->album;
        $chanson->annee = $request->annee;
        $chanson->categorie = $request->categorie;
        $chanson->image = $request->image;
        
        $chanson->save();

        return redirect('/');
    }
}
