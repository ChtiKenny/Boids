class Boid {
    constructor (x, y) {
        this.position = new Vector(x,y)
        this.velocity = Vector.random2D().setMag(4)
        this.acceleration = new Vector()

        this.size = 4
        this.perception = 50
        this.maxForce = 0.1
        this.maxSpeed = 2
        this.minSpeed = 0.5

        this.sliders = {
            separation : 1,
            cohesion : 0.8,
            alignment : 1
        }

        this.color = 'rgba(255, 255, 255, 0.7)'
        return this.toString()
    }
}