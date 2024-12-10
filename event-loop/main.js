console.log("sync code start");
setTimeout(()=> {
	console.log('from timeout')
}, 0)
Promise.resolve().then(()=> {console.log('from promise')})
process.nextTick(()=> {
	console.log('from nextTick');
})
setImmediate(()=> {
	console.log('from setImmediate');
})
console.log("sync code end");
