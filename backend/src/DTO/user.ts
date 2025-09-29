export type UserType = {
    id: number,
    username: string,
    password: string,
    email: string,
    position: string,
    active: boolean,
    mnemonic: any
}

export class UserDTO {

    id;
    username;
    email;
    position;
    active;
    mnemonic;

    constructor({ id, username, email, position, active, mnemonic }: UserType) {
        this.id = id
        this.username = username
        this.email = email
        this.position = position
        this.active = active
        this.mnemonic = mnemonic
    }

}

export class CreateUserDTO {

    username;
    password;
    email;

    constructor({ username, password, email }: UserType) {
        if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
            throw new Error("your email is not valid")
        } if (username.length < 6) {
            throw new Error('Username must be at least 6 characters');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        this.username = username
        this.password = password
        this.email = email
    }
}