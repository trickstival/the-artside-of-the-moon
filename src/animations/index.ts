import { Vector3 } from "three"
import TWEEN from "@tweenjs/tween.js"

export function spinAround (object: Vector3, axis: Vector3, radiusStep = 20) {
    const midX = axis.x
    const rightX = midX + radiusStep
    const leftX = midX - radiusStep

    const midZ = axis.z
    const frontZ = midZ + radiusStep
    const backZ = midZ - radiusStep
    return new TWEEN.Tween(object)
        .to({
            x: [rightX, midX, leftX, midX],
            z: [midZ, backZ, midZ, frontZ],
        }, 20000)
        .interpolation(TWEEN.Interpolation.CatmullRom)
        .repeat(Infinity)
}

export function autoRotate (object: Vector3, time = 2000000) {
    return new TWEEN.Tween(object)
        .to({ y: 360 }, time)
        .repeat(Infinity)
}
