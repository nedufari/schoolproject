
export function GenerateOtp(maxOtp = 6){
    const digits ='0123456789'
    let otp  =""
    for ( let i = 0; i < maxOtp; i+=1 ){
        otp += digits[Math.floor(Math.random()*10)]

    }
    return {
        otp, 
        exp:OTPExpireTime()

    }
}

export function OTPExpireTime(){
    var now = new Date();
    now.setMinutes(now.getMinutes()+5);
    return now
}