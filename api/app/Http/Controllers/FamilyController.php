<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Family;
use DB;
// use Illuminate\Support\Facades\DB;
use App\Http\Resources\Family as FamilyResource;
// use App\Http\Controllers\Api\AuthController;
use Tymon\JWTAuth\JWTAuth;

class FamilyController extends Controller
{
    /**
     * @var JWTAuth
     */
    private $jwtAuth;

    public function __construct(JWTAuth $jwtAuth) {
        $this->jwtAuth = $jwtAuth;
    }

    public function getUserByToken() {

	    if (! $user = $this->jwtAuth->parseToken()->authenticate()) {
		    return response()->json(['error' => 'user_not_found'], 404);
        }

        // $user = $user->family;
        return $user;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $family = new Family;

        $family->name = $request->input('email');
        $family->password = $request->input('password');
        $family->admin = $this->getUserByToken()->id;
        $family->best_score = 0;

        if ($family->save()) {
            return new FamilyResource($family);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $family = Family::findOrFail($id);
        return new FamilyResource($family);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getFamily(Request $request)
    {
        $name = $request->input('email');
        $password = $request->input('password');
        $login = DB::table('familys')->where(['name' => $name, 'password' => $password])->get();
        if (count($login)>0){
            $family = $this->show($login[0]->id);
            return response()->json(compact('family'));

        } else {
            return response()->json(['error' => 'Family_not_found'], 400);
        }
        // var_dump($login);
        // return new FamilyResource($family);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $familyID = $this->getUserByToken()->family;
        if ( $familyID == $id ) {
            $familyfound = Family::findOrFail($id);
            $family = new \stdClass();
            $family->id = $id;
            $family->name = is_null($request->input('email')) ? null : $request->input('email');
            $family->password = is_null($request->input('password')) ? null : $request->input('password');
            $family->admin = is_null($request->input('admin')) ? null : $request->input('admin');

            $score = $request->input('score') - $familyfound->best_score;
            if ($score > 0) {
                $family->best_score = $request->input('score');
            } else {
                $family->best_score = null;
            }

            foreach ($family as $key => $value) {
                if ($value === null) {
                    unset($family->$key);
                }
            }

            $data = get_object_vars($family);
            $data = DB::table('familys')->where('id', $id)->update($data);
            if ($data) {
                return $this->show($id);
            } else {
                return $this->show($id);
                // return response()->json(['no_need_to_update']);
            }
        } else {
            return "Hacking it isn't allowed!";
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $familyID = $this->getUserByToken()->family;
        if ( $familyID == $id ) {
            $family = Family::findOrFail($id);
            if ($family->delete()) {
                return new FamilyResource($family);
            }
        } else {
            return "Hacking it isn't allowed!";
        }
    }
}
