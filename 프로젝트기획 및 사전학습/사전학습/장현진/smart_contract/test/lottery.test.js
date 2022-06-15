

const Lottery = artifacts.require("Lottery");

contract('Lottery' , function([deployer , user1 , user2]){
    beforeEach(async()=>{
        console.log('Before each');
        lottery  = new Lottery.new();
    })

    it('basic test' , async() => {
        console.log();
    })
})