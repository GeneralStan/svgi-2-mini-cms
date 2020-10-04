import { Body, Controller, Get, Param, HttpException, HttpStatus, ParseIntPipe, Post, Put, Delete, Res } from '@nestjs/common';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { renderToNodeStream } from 'react-dom/server';
import * as React from 'react';
import { Reply } from '../global/custom.interfaces';
import renderEngine from '../global/render.engine';
import App from '../clients_dev/user-react-web-client/src/App';
//import {FindOneParams} from './validators/params.validator';

@Controller('users')
export class UsersController {

    /**
     * 
     * @param usersService 
     * Inject userssService
     */
    constructor(private readonly usersService: UsersService) { }

    /**
     * 
     * @param createUserDto 
     * Handle Post request for create
     */
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        //console.log(JSON.stringify(createUserDto));
        return this.usersService.create(createUserDto);
    }

    /**
     * Handle Get request for find
     */
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    /**
     * 
     * @param id 
     * Handle Get request for find by id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    /**
     * 
     * @param id id of user to be updated
     * @param updateUserDto new content
     * Handle Put request for 
     */
    /* FindParams is not working well so we'll be using ParseInt instead. 

    @Put(':id')

    partialUpdate(@Param('id') id: FindOneParams, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return this.usersService.update1(id, updateUserDto);
    }
    */
    @Put(':id')

    partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return this.usersService.update1(id, updateUserDto);
    }


    /**
     * 
     * @param user 
     * Non-partial update. Takes a full user without param.
     */
    @Put()
    update(@Body() user: User): Promise<User> {
        return this.usersService.update2(user);
    }

    /**
     * @param id
     * */


    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {    //we are not yet using delete for this second commit
        return this.usersService.delete(id)

    }

    @Get('web')
    web(@Res() reply: Reply) {

        //We want to render the raw way so that we can call renderToStream
        const res = reply.raw;

        /*We want to be able to send some initialization data to the react component
        Just using below string as an illustration placeholder for now. The real value will be 
        when we implement Authentication and Authorization.
        The token will contain whatever data you want to pass but in base64 digest format.
        */
        const initialProps = { jwtToken: "put-the-token-string-here-if-any" };


        const beforeStream = renderEngine().render('users/before-react-stream.fragment.html',
            { title: 'Users Administration', UsersActive: true })

        const afterStream = renderEngine().render('users/after-react-stream.fragment.html',
            { initialProps: JSON.stringify(initialProps) })

        //Write the first rendered fragment (upper html part)
        res.write(beforeStream);

        //write the React app using renderToNodeStream
        const stream = renderToNodeStream(<App {...initialProps} />)

        stream.addListener('end', () => {
            res.write(afterStream); //Write the last rendered fragment (lower html part)
            res.end();
        });

        //enable stream piping
        stream.pipe(res, { end: false });

    }
}

