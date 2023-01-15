radio.setGroup(0)
//serial.redirectToUSB()

let service = Service.Luz

input.onLogoEvent(TouchButtonEvent.Pressed,()=>{
    service = (service + 1) % nServicios
    basic.showString(Services[service])
})

let brillo = 0
let temp = 0

basic.forever(() => {

    switch(service){
        case Service.Luz:

        let newBrillo = pins.P2.analogRead()
        if (Math.abs(newBrillo - brillo) > 1){
            //basic.showNumber(newBrillo)
            //serial.writeValue("Brillo", newBrillo)
            radio.sendValue("LUZ", newBrillo)

            brillo = newBrillo
        }

        break;

        case Service.Lock:

        if (input.buttonIsPressed(Button.A))
            radio.sendValue("LOCK", 1)
        else if (input.buttonIsPressed(Button.B))
            radio.sendValue("LOCK", 0)

        break;

        case Service.Termostato:

            let newTemp = pins.P2.analogRead()
            if (Math.abs(newTemp - temp) > 1) {
                //basic.showNumber(newBrillo)
                //serial.writeValue("Brillo", newBrillo)
                radio.sendValue("TEMP", newTemp)

                temp = newTemp
            }

        

    
    }
 
 })

