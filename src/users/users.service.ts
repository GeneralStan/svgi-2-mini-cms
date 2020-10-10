import { Injectable } from '@nestjs/common';
import {UsersWithCount} from 'src/global/custom.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';
import { Profile} from './models/profile.entity';
import { User} from './models/user.entity';
import {FindOneParams} from './validators/params.validator';

@Injectable()
export class UsersService{

    /**
     * 
     * @param userRepository 
     * @param profileRepository 
     */
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ){}

    /**
     * 
     * @param createUserDto 
     * 
     */
    //create below assumes that user model does not allow cascade create of profile
    /*
    async create (createUserDto: CreateUserDto): Promise<User>{

        const newProfile = this.profileRepository.create(createUserDto.profile)
        const profile = await this.profileRepository.save(newProfile);


        const newItem = this.userRepository.create(createUserDto);
        //associate the profile created above with newItem before saving
        newItem.profile = profile;

        
        return this.userRepository.save(newItem);
    }
    */

    /**
     * 
     * @param createUserDto 
     */
    async create (createUserDto: CreateUserDto): Promise<User>{

        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);

    }

    /**
     * See https://typeorm.io/#/find-options
     */
    /*
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    */
    
    //2. Note: You can indicate the fields to be returned
    
    async findAllWithOptions(findOptions:string): Promise<UsersWithCount> {
        const[users, count] = await
    this.userRepository.findAndCount(JSON.parse(findOptions));
        return{users, count};
    }
    async findAll():Promise<UsersWithCount>{
        const[users,count] =await this.userRepository.findAndCount();
    return{users, count} 
   }

    //3. For relations, you can specify relations to be included in return
    /**
     * find all and return only code and name along with profile relation
     
    async findAll(): Promise<User[]> {
        return await this.userRepository.find({select: ["firstName", "lastName","id"], relations: ["profile"]});
    }
    */
    
    //4. Etc. See https://typeorm.io/#/find-options

    /**
     * 
     * @param id 
     * find by id
     */
    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }
    
    /**
     * 
     * @param id 
     * Finds by a criterion (id in this case) and deletes. Returns void
     */
    /* FindOneParams not working well. Using ParseIntPipe
    async delete(id: FindOneParams): Promise<void> {
        await this.userRepository.delete(id);
    }
    */
   async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
}


    /**
     * 
     * @param user 
     * Remove the user specifed. Returns user removed.
     */
    async remove(user: User): Promise<User> {
        return await this.userRepository.remove(user);
    }

    //partial update
    /**
     * 
     * @param id 
     * @param user 
     * Find by the id and replace the fields sent in Dto
     */

    /* FindOneParams not working well.Using ParseIntPipe
    async update1(id: FindOneParams, user: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, { ...user})
    }
    */
   async update1(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, { ...user})
}

    /**
     * 
     * @param user 
     * No partial update allowed here. Saves the user object supplied
     */
    async update2(user: User): Promise<User> {
        return await this.userRepository.save(user)
    }


}
