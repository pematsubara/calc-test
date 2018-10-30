<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Task;
use App\Http\Resources\Task as TaskResource;
use Tymon\JWTAuth\JWTAuth;
use DB;

class TaskController extends Controller
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
        $task = new Task;

        $task->name = $request->input('name');
        $task->family = $this->getUserByToken()->family;
        $task->score = $request->input('score', 1);
        $task->last_user = $request->input('last_user', 'Nova tarefa');
        $task->frequency = $request->input('frequency', 86400);
        $task->icon = $request->input('icon', 'fas fa-star');

        if ($task->save()) {
            return $this->show($task->family);
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
        $tasks = DB::table('tasks')->where('family', $id)->get();
        return response()->json(compact('tasks'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response

    public function edit($id)
    {
        //
    }*/

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $taskfound = Task::findOrFail($id);
        $familyID = $this->getUserByToken()->family;
        if ( $familyID == $taskfound->family ) {
            $task = new \stdClass();
            $task->id = $id;
            $task->name = is_null($request->input('name')) ? null : $request->input('name');
            $task->score = is_null($request->input('score')) ? null : $request->input('score');
            $task->last_user = is_null($request->input('last_user')) ? null : $request->input('last_user');
            $task->frequency = is_null($request->input('frequency')) ? null : $request->input('frequency');
            $task->icon = is_null($request->input('icon')) ? null : $request->input('icon');

            foreach ($task as $key => $value) {
                if ($value == null) {
                    unset($task->$key);
                }
            }

            $data = get_object_vars($task);
            $data = DB::table('tasks')->where('id', $id)->update($data);
            if ($data) {
                return $this->show($familyID);
            } else {
                return $this->show($familyID);
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
        $task = Task::findOrFail($id);
        $familyID = $this->getUserByToken()->family;
        if ( $familyID == $task->family ) {
            if ($task->delete()) {
                return $this->show($familyID);
            } else {
                return $this->show($familyID);
            }
        } else {
            return "Hacking it isn't allowed!";
        }
    }
}
