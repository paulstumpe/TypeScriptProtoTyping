
 const drawCircle = (context:CanvasRenderingContext2D, frameCount:number) => {

  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  context.fillStyle = '#000000'
  context.beginPath()
  context.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
  context.fill()
}

 export default drawCircle
