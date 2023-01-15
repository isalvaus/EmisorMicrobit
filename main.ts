radio.setGroup(0)
//serial.redirectToUSB()

let service = Service.Luz

input.onLogoEvent(TouchButtonEvent.Pressed,()=>{
    service = (service + 1) % nServicios
    basic.showString(Services[service])
})

let brillo = 0
basic.forever(() => {
    let newBrillo = pins.P2.analogRead()
    if (Math.abs(newBrillo - brillo) > 1){
        //basic.showNumber(newBrillo)
        //serial.writeValue("Brillo", newBrillo)
        radio.sendValue("LUZ", newBrillo)

        brillo = newBrillo
    }
 
 })

