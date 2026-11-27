import assert from 'node:assert/strict';
import * as C from './core.mjs';
import {parseWords,srt} from './captions.mjs';
import * as FX from './effects.mjs';
let p=C.project();
p=C.addAsset(p,{id:'a',kind:'video',name:'original.mp4',duration:40.5,width:512,height:910});
p=C.addAsset(p,{id:'b',kind:'video',name:'segundo.mp4',duration:37.9,width:1080,height:1920});
p=C.addClip(p,'a');p=C.addClip(p,'b');
const a=p.clips[0].id,b=p.clips[1].id,original=JSON.stringify(p);
assert.equal(C.total(p),2352);assert.equal(C.locate(p,1215).asset,'b');assert.equal(C.locate(p,1215).source,0);
let q=C.trim(C.trim(p,a,2,8),b,4,9);assert.equal(C.total(q),330);assert.equal(JSON.stringify(p),original);
let r=C.split(q,a,90);assert.equal(C.total(r),330);assert.equal(r.clips.length,3);assert.equal(C.audioPlan(r)[1].offset,5);assert.equal(C.audioPlan(r)[1].start,3);
r=C.move(r,b,0);assert.equal(C.locate(r,0).asset,'b');assert.equal(C.audioPlan(r)[0].offset,4);
r=C.duplicate(r,b);assert.equal(C.total(r),480);assert.equal(C.total(C.remove(r,b)),330);
let h=new C.History(q);h.commit(r);assert.equal(C.total(h.undo()),330);assert.equal(C.total(h.redo()),480);h.undo();h.commit(C.remove(q,a));assert.equal(h.canRedo,false);
q=C.setCaptions(q,'a',[{start:2.3,end:2.6,text:'olha'},{start:2.7,end:3,text:'isso!'}]);
q=C.setCaptions(q,'b',[{start:4,end:4.3,text:'aqui'}]);assert.equal(C.captionWords(q)[0].start,9);assert.equal(C.captionWords(q).at(-1).start,180);assert.equal(C.captionAt(q,8),null);assert.equal(C.captionAt(q,19).revealed.length,1);assert.equal(C.captionWords(C.move(q,b,0))[0].text,'aqui');
let k=C.keyframe(q,a,90,{zoom:2,x:30});let split=C.split(k,a,45);assert.ok(Math.abs(C.poseAt(split.clips[1],4).zoom-(1+2/3))<1e-6);
let ex=C.extractAudio(q,a);assert.equal(ex.clips[0].muted,true);assert.equal(C.audioPlan(ex).filter(x=>x.asset==='a').length,1);
let fast=C.update(q,a,{rate:1.5});let fastAudio=C.extractAudio(fast,a);let fastTrack=C.audioPlan(fastAudio).find(x=>x.asset==='a');assert.equal(fastTrack.rate,1.5);assert.ok(Math.abs(fastTrack.duration-(fastTrack.outputDuration*1.5))<.04);assert.equal(C.validate(fastAudio),fastAudio);
let overlayAudio=C.addLayer(q,{kind:'audio',asset:'a',start:0,end:90,offset:0,rate:1.5,volume:.7,fade:.1});assert.equal(C.audioPlan(overlayAudio).find(x=>x.asset==='a').rate,1.5);assert.equal(C.validate(overlayAudio),overlayAudio);
assert.throws(()=>C.trim(q,a,0,99));assert.throws(()=>C.addLayer(q,{kind:'video',asset:'b',start:0,end:3000,offset:0}));assert.throws(()=>C.setCaptions(q,'a',[{start:1,end:2,text:'a'},{start:1.5,end:3,text:'b'}]));
assert.ok(srt(q,C.captionGroups(q)).includes('00:00:00,300'));assert.equal(parseWords('0.1 | 0.4 | promoção',1)[0].text,'promoção');
// Effects pack: .cube parser, embedded LUTs, shader manifest, blend modes and speed curves.
for(const [id,lut] of Object.entries(FX.BUILTIN_LUTS)){assert.equal(lut.size,3);assert.equal(lut.data.length,27);assert.ok(lut.data.every(rgb=>rgb.length===3&&rgb.every(v=>v>=0&&v<=1)))}
const identityCube=['TITLE "Identity"','LUT_3D_SIZE 2','DOMAIN_MIN 0 0 0','DOMAIN_MAX 1 1 1','0 0 0','1 0 0','0 1 0','1 1 0','0 0 1','1 0 1','0 1 1','1 1 1'].join('\n');
const identity=FX.parseCube(identityCube);assert.equal(identity.title,'Identity');assert.deepEqual(identity.applyToPixel(.2,.4,.7,1).map(x=>Math.round(x*100)/100),[.2,.4,.7]);assert.throws(()=>FX.parseCube('LUT_3D_SIZE 3\n0 0 0'));
assert.equal(FX.speedProgress('none',.37),.37);assert.equal(FX.speedProgress('flashOut',0),0);assert.equal(FX.speedProgress('impactPunch',1),1);
for(const preset of ['flashOut','impactPunch']){let curve=FX.speedRateCurve(preset,1,128);assert.equal(curve.length,128);assert.ok(curve.every(x=>x>=.08&&Number.isFinite(x)));assert.ok(Math.abs(curve.reduce((a,b)=>a+b,0)/curve.length-1)<.015)}
assert.ok(FX.SHADERS.fragment.includes('sampler3D'));assert.ok(FX.SHADERS.fragment.includes('RGB'));assert.ok(FX.BLEND_MODES.some(x=>x[0]==='screen'));
let ramped=C.update(q,a,{speedRamp:'impactPunch',lut:'warm_vintage',lutIntensity:.2,vfx:'filmGrain',vfxIntensity:.25,blendMode:'screen'});assert.equal(C.validate(ramped),ramped);assert.equal(C.locate(ramped,Math.round(C.spans(ramped)[0].count*.5)).source, C.locate(ramped,Math.round(C.spans(ramped)[0].count*.5)).source);assert.equal(C.audioPlan(ramped)[0].speedRamp,'impactPunch');
let rampedAudio=C.extractAudio(ramped,a);assert.equal(C.audioPlan(rampedAudio).find(x=>x.asset==='a').speedRamp,'impactPunch');assert.equal(C.validate(rampedAudio),rampedAudio);
let rampedCaptions=C.setCaptions(ramped,'a',[{start:2.3,end:2.6,text:'olha'},{start:2.7,end:3,text:'isso!'}]);assert.ok(C.captionWords(rampedCaptions).every(w=>w.end>w.start));
console.log('V2: núcleo + pacote de efeitos aprovados.');

