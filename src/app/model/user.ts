export class User{
  public id: number;
	public userId: string;
	public  nic: string;
	public  name: string;
	public  username: string;
	public  password: string;
	public  email: string;
	public  phone: number;
	public  profileImageUrl: string;
	public  lastLoginDate: Date;// last time login
	public  lastLoginDateDisplay: Date;// for display last time login
	public  joinDate: Date;
	public  role: string;
	public  authorities: []; //give permission or assign for do some things
	public  active: boolean;
	public  notLocked: boolean;

  constructor(){
    this.nic = '';
    this.name = '';
    this.username = '';
    this.email = '';
    this.phone = null;
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
