(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const jo="160",Ah=0,xa=1,Ih=2,_c=1,qo=2,In=3,Dn=0,jt=1,nn=2,Yn=0,Wi=1,_a=2,ba=3,Ma=4,Ch=5,ai=100,Rh=101,Ph=102,Sa=103,wa=104,Lh=200,Dh=201,Fh=202,Bh=203,Ao=204,Io=205,Uh=206,kh=207,Nh=208,Oh=209,zh=210,Hh=211,Gh=212,Vh=213,Wh=214,$h=0,Xh=1,jh=2,pr=3,qh=4,Yh=5,Kh=6,Zh=7,wr=0,Jh=1,Qh=2,Kn=0,ed=1,td=2,nd=3,bc=4,id=5,sd=6,Ea="attached",rd="detached",Mc=300,qi=301,Yi=302,fr=303,Co=304,Er=306,Jn=1e3,$t=1001,mr=1002,Tt=1003,Ro=1004,dr=1005,Vt=1006,Sc=1007,pi=1008,Zn=1009,od=1010,ad=1011,Yo=1012,wc=1013,Xn=1014,Rn=1015,vs=1016,Ec=1017,Tc=1018,ci=1020,ld=1021,sn=1023,cd=1024,hd=1025,hi=1026,Ki=1027,dd=1028,Ac=1029,ud=1030,Ic=1031,Cc=1033,Or=33776,zr=33777,Hr=33778,Gr=33779,Ta=35840,Aa=35841,Ia=35842,Ca=35843,Rc=36196,Ra=37492,Pa=37496,La=37808,Da=37809,Fa=37810,Ba=37811,Ua=37812,ka=37813,Na=37814,Oa=37815,za=37816,Ha=37817,Ga=37818,Va=37819,Wa=37820,$a=37821,Vr=36492,Xa=36494,ja=36495,pd=36283,qa=36284,Ya=36285,Ka=36286,Po=2200,Pc=2201,fd=2202,xs=2300,Zi=2301,Wr=2302,Oi=2400,zi=2401,gr=2402,Ko=2500,md=2501,gd=0,Lc=1,Lo=2,Dc=3e3,di=3001,yd=3200,vd=3201,Tr=0,xd=1,rn="",tt="srgb",It="srgb-linear",Zo="display-p3",Ar="display-p3-linear",yr="linear",ot="srgb",vr="rec709",xr="p3",bi=7680,Za=519,_d=512,bd=513,Md=514,Fc=515,Sd=516,wd=517,Ed=518,Td=519,Do=35044,Ja="300 es",Fo=1035,Pn=2e3,_r=2001;class _i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qa=1234567;const fs=Math.PI/180,Ji=180/Math.PI;function mn(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Rt[o&255]+Rt[o>>8&255]+Rt[o>>16&255]+Rt[o>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]).toLowerCase()}function At(o,e,t){return Math.max(e,Math.min(t,o))}function Jo(o,e){return(o%e+e)%e}function Ad(o,e,t,n,i){return n+(o-e)*(i-n)/(t-e)}function Id(o,e,t){return o!==e?(t-o)/(e-o):0}function ms(o,e,t){return(1-t)*o+t*e}function Cd(o,e,t,n){return ms(o,e,1-Math.exp(-t*n))}function Rd(o,e=1){return e-Math.abs(Jo(o,e*2)-e)}function Pd(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*(3-2*o))}function Ld(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*o*(o*(o*6-15)+10))}function Dd(o,e){return o+Math.floor(Math.random()*(e-o+1))}function Fd(o,e){return o+Math.random()*(e-o)}function Bd(o){return o*(.5-Math.random())}function Ud(o){o!==void 0&&(Qa=o);let e=Qa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kd(o){return o*fs}function Nd(o){return o*Ji}function Bo(o){return(o&o-1)===0&&o!==0}function Od(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function br(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function zd(o,e,t,n,i){const s=Math.cos,r=Math.sin,a=s(t/2),l=r(t/2),c=s((e+n)/2),h=r((e+n)/2),d=s((e-n)/2),u=r((e-n)/2),p=s((n-e)/2),g=r((n-e)/2);switch(i){case"XYX":o.set(a*h,l*d,l*u,a*c);break;case"YZY":o.set(l*u,a*h,l*d,a*c);break;case"ZXZ":o.set(l*d,l*u,a*h,a*c);break;case"XZX":o.set(a*h,l*g,l*p,a*c);break;case"YXY":o.set(l*p,a*h,l*g,a*c);break;case"ZYZ":o.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function xn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function et(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Lt={DEG2RAD:fs,RAD2DEG:Ji,generateUUID:mn,clamp:At,euclideanModulo:Jo,mapLinear:Ad,inverseLerp:Id,lerp:ms,damp:Cd,pingpong:Rd,smoothstep:Pd,smootherstep:Ld,randInt:Dd,randFloat:Fd,randFloatSpread:Bd,seededRandom:Ud,degToRad:kd,radToDeg:Nd,isPowerOfTwo:Bo,ceilPowerOfTwo:Od,floorPowerOfTwo:br,setQuaternionFromProperEuler:zd,normalize:et,denormalize:xn};class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,t,n,i,s,r,a,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,l,c)}set(e,t,n,i,s,r,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],y=i[0],m=i[3],f=i[6],x=i[1],v=i[4],_=i[7],C=i[2],A=i[5],I=i[8];return s[0]=r*y+a*x+l*C,s[3]=r*m+a*v+l*A,s[6]=r*f+a*_+l*I,s[1]=c*y+h*x+d*C,s[4]=c*m+h*v+d*A,s[7]=c*f+h*_+d*I,s[2]=u*y+p*x+g*C,s[5]=u*m+p*v+g*A,s[8]=u*f+p*_+g*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*a*c-n*s*h+n*a*l+i*s*c-i*r*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*r-a*c,u=a*l-h*s,p=c*s-r*l,g=t*d+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=d*y,e[1]=(i*c-h*n)*y,e[2]=(a*n-i*r)*y,e[3]=u*y,e[4]=(h*t-i*l)*y,e[5]=(i*s-a*t)*y,e[6]=p*y,e[7]=(n*l-c*t)*y,e[8]=(r*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*r+c*a)+r+e,-i*c,i*l,-i*(-c*r+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply($r.makeScale(e,t)),this}rotate(e){return this.premultiply($r.makeRotation(-e)),this}translate(e,t){return this.premultiply($r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $r=new ze;function Bc(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function _s(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Hd(){const o=_s("canvas");return o.style.display="block",o}const el={};function gs(o){o in el||(el[o]=!0,console.warn(o))}const tl=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nl=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Fs={[It]:{transfer:yr,primaries:vr,toReference:o=>o,fromReference:o=>o},[tt]:{transfer:ot,primaries:vr,toReference:o=>o.convertSRGBToLinear(),fromReference:o=>o.convertLinearToSRGB()},[Ar]:{transfer:yr,primaries:xr,toReference:o=>o.applyMatrix3(nl),fromReference:o=>o.applyMatrix3(tl)},[Zo]:{transfer:ot,primaries:xr,toReference:o=>o.convertSRGBToLinear().applyMatrix3(nl),fromReference:o=>o.applyMatrix3(tl).convertLinearToSRGB()}},Gd=new Set([It,Ar]),Ze={enabled:!0,_workingColorSpace:It,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(o){if(!Gd.has(o))throw new Error(`Unsupported working color space, "${o}".`);this._workingColorSpace=o},convert:function(o,e,t){if(this.enabled===!1||e===t||!e||!t)return o;const n=Fs[e].toReference,i=Fs[t].fromReference;return i(n(o))},fromWorkingColorSpace:function(o,e){return this.convert(o,this._workingColorSpace,e)},toWorkingColorSpace:function(o,e){return this.convert(o,e,this._workingColorSpace)},getPrimaries:function(o){return Fs[o].primaries},getTransfer:function(o){return o===rn?yr:Fs[o].transfer}};function $i(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Xr(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Mi;class Uc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Mi===void 0&&(Mi=_s("canvas")),Mi.width=e.width,Mi.height=e.height;const n=Mi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Mi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_s("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=$i(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($i(t[n]/255)*255):t[n]=$i(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vd=0;class kc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=mn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(jr(i[r].image)):s.push(jr(i[r]))}else s=jr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function jr(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Uc.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wd=0;class xt extends _i{constructor(e=xt.DEFAULT_IMAGE,t=xt.DEFAULT_MAPPING,n=$t,i=$t,s=Vt,r=pi,a=sn,l=Zn,c=xt.DEFAULT_ANISOTROPY,h=rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=mn(),this.name="",this.source=new kc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(gs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===di?tt:rn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jn:e.x=e.x-Math.floor(e.x);break;case $t:e.x=e.x<0?0:1;break;case mr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jn:e.y=e.y-Math.floor(e.y);break;case $t:e.y=e.y<0?0:1;break;case mr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return gs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===tt?di:Dc}set encoding(e){gs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===di?tt:rn}}xt.DEFAULT_IMAGE=null;xt.DEFAULT_MAPPING=Mc;xt.DEFAULT_ANISOTROPY=1;class Ye{constructor(e=0,t=0,n=0,i=1){Ye.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,_=(p+1)/2,C=(f+1)/2,A=(h+u)/4,I=(d+y)/4,L=(g+m)/4;return v>_&&v>C?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=A/n,s=I/n):_>C?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=A/i,s=L/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=I/s,i=L/s),this.set(n,i,s,t),this}let x=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(d-y)/x,this.z=(u-h)/x,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $d extends _i{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ye(0,0,e,t),this.scissorTest=!1,this.viewport=new Ye(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(gs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===di?tt:rn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new xt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new kc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fi extends $d{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Nc extends xt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=$t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xd extends xt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=$t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ht{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=s[r+0],p=s[r+1],g=s[r+2],y=s[r+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=y;return}if(d!==y||l!==u||c!==p||h!==g){let m=1-a;const f=l*u+c*p+h*g+d*y,x=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const C=Math.sqrt(v),A=Math.atan2(C,f*x);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const _=a*x;if(l=l*m+u*_,c=c*m+p*_,h=h*m+g*_,d=d*m+y*_,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,r){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return e[t]=a*g+h*d+l*p-c*u,e[t+1]=l*g+h*u+c*d-a*p,e[t+2]=c*g+h*p+a*u-l*d,e[t+3]=h*g-a*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,r=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(s/2),u=l(n/2),p=l(i/2),g=l(s/2);switch(r){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(r-i)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(i+r)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(s-c)/p,this._x=(i+r)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(r-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,r=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+r*a+i*c-s*l,this._y=i*h+r*l+s*a-n*c,this._z=s*h+r*c+n*l-i*a,this._w=r*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,r=this._w;let a=r*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*r+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=r*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,a=e.z,l=e.w,c=2*(r*i-a*n),h=2*(a*t-s*i),d=2*(s*n-r*t);return this.x=t+l*c+r*d-a*h,this.y=n+l*h+a*c-s*d,this.z=i+l*d+s*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,r=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*r-n*l,this.z=n*a-i*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qr.copy(this).projectOnVector(e),this.sub(qr)}reflect(e){return this.sub(qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qr=new T,il=new ht;class Yt{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)e.isMesh===!0?e.getVertexPosition(r,cn):cn.fromBufferAttribute(s,r),cn.applyMatrix4(e.matrixWorld),this.expandByPoint(cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bs.copy(n.boundingBox)),Bs.applyMatrix4(e.matrixWorld),this.union(Bs)}const i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,cn),cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(os),Us.subVectors(this.max,os),Si.subVectors(e.a,os),wi.subVectors(e.b,os),Ei.subVectors(e.c,os),kn.subVectors(wi,Si),Nn.subVectors(Ei,wi),ti.subVectors(Si,Ei);let t=[0,-kn.z,kn.y,0,-Nn.z,Nn.y,0,-ti.z,ti.y,kn.z,0,-kn.x,Nn.z,0,-Nn.x,ti.z,0,-ti.x,-kn.y,kn.x,0,-Nn.y,Nn.x,0,-ti.y,ti.x,0];return!Yr(t,Si,wi,Ei,Us)||(t=[1,0,0,0,1,0,0,0,1],!Yr(t,Si,wi,Ei,Us))?!1:(ks.crossVectors(kn,Nn),t=[ks.x,ks.y,ks.z],Yr(t,Si,wi,Ei,Us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Mn=[new T,new T,new T,new T,new T,new T,new T,new T],cn=new T,Bs=new Yt,Si=new T,wi=new T,Ei=new T,kn=new T,Nn=new T,ti=new T,os=new T,Us=new T,ks=new T,ni=new T;function Yr(o,e,t,n,i){for(let s=0,r=o.length-3;s<=r;s+=3){ni.fromArray(o,s);const a=i.x*Math.abs(ni.x)+i.y*Math.abs(ni.y)+i.z*Math.abs(ni.z),l=e.dot(ni),c=t.dot(ni),h=n.dot(ni);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const jd=new Yt,as=new T,Kr=new T;class gn{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const t=as.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(as,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(as.copy(e.center).add(Kr)),this.expandByPoint(as.copy(e.center).sub(Kr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sn=new T,Zr=new T,Ns=new T,On=new T,Jr=new T,Os=new T,Qr=new T;class Es{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Zr.copy(e).add(t).multiplyScalar(.5),Ns.copy(t).sub(e).normalize(),On.copy(this.origin).sub(Zr);const s=e.distanceTo(t)*.5,r=-this.direction.dot(Ns),a=On.dot(this.direction),l=-On.dot(Ns),c=On.lengthSq(),h=Math.abs(1-r*r);let d,u,p,g;if(h>0)if(d=r*l-a,u=r*a-l,g=s*h,d>=0)if(u>=-g)if(u<=g){const y=1/h;d*=y,u*=y,p=d*(d+r*u+2*a)+u*(r*d+u+2*l)+c}else u=s,d=Math.max(0,-(r*u+a)),p=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(r*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-r*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(d=Math.max(0,-(r*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c);else u=r>0?-s:s,d=Math.max(0,-(r*u+a)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Zr).addScaledVector(Ns,u),p}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),i=Sn.dot(Sn)-n*n,s=e.radius*e.radius;if(i>s)return null;const r=Math.sqrt(s-i),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,r=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,r=(e.min.y-u.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,i,s){Jr.subVectors(t,e),Os.subVectors(n,e),Qr.crossVectors(Jr,Os);let r=this.direction.dot(Qr),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;On.subVectors(this.origin,e);const l=a*this.direction.dot(Os.crossVectors(On,Os));if(l<0)return null;const c=a*this.direction.dot(Jr.cross(On));if(c<0||l+c>r)return null;const h=-a*On.dot(Qr);return h<0?null:this.at(h/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(e,t,n,i,s,r,a,l,c,h,d,u,p,g,y,m){ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,l,c,h,d,u,p,g,y,m)}set(e,t,n,i,s,r,a,l,c,h,d,u,p,g,y,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=s,f[5]=r,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ti.setFromMatrixColumn(e,0).length(),s=1/Ti.setFromMatrixColumn(e,1).length(),r=1/Ti.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=r*h,p=r*d,g=a*h,y=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=u-y*c,t[9]=-a*l,t[2]=y-u*c,t[6]=g+p*c,t[10]=r*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,g=c*h,y=c*d;t[0]=u+y*a,t[4]=g*a-p,t[8]=r*c,t[1]=r*d,t[5]=r*h,t[9]=-a,t[2]=p*a-g,t[6]=y+u*a,t[10]=r*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,g=c*h,y=c*d;t[0]=u-y*a,t[4]=-r*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=r*h,t[9]=y-u*a,t[2]=-r*c,t[6]=a,t[10]=r*l}else if(e.order==="ZYX"){const u=r*h,p=r*d,g=a*h,y=a*d;t[0]=l*h,t[4]=g*c-p,t[8]=u*c+y,t[1]=l*d,t[5]=y*c+u,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=r*l}else if(e.order==="YZX"){const u=r*l,p=r*c,g=a*l,y=a*c;t[0]=l*h,t[4]=y-u*d,t[8]=g*d+p,t[1]=d,t[5]=r*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*d+g,t[10]=u-y*d}else if(e.order==="XZY"){const u=r*l,p=r*c,g=a*l,y=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+y,t[5]=r*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qd,e,Yd)}lookAt(e,t,n){const i=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),zn.crossVectors(n,Zt),zn.lengthSq()===0&&(Math.abs(n.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),zn.crossVectors(n,Zt)),zn.normalize(),zs.crossVectors(Zt,zn),i[0]=zn.x,i[4]=zs.x,i[8]=Zt.x,i[1]=zn.y,i[5]=zs.y,i[9]=Zt.y,i[2]=zn.z,i[6]=zs.z,i[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],y=n[6],m=n[10],f=n[14],x=n[3],v=n[7],_=n[11],C=n[15],A=i[0],I=i[4],L=i[8],b=i[12],S=i[1],O=i[5],z=i[9],Y=i[13],P=i[2],F=i[6],G=i[10],j=i[14],W=i[3],X=i[7],$=i[11],te=i[15];return s[0]=r*A+a*S+l*P+c*W,s[4]=r*I+a*O+l*F+c*X,s[8]=r*L+a*z+l*G+c*$,s[12]=r*b+a*Y+l*j+c*te,s[1]=h*A+d*S+u*P+p*W,s[5]=h*I+d*O+u*F+p*X,s[9]=h*L+d*z+u*G+p*$,s[13]=h*b+d*Y+u*j+p*te,s[2]=g*A+y*S+m*P+f*W,s[6]=g*I+y*O+m*F+f*X,s[10]=g*L+y*z+m*G+f*$,s[14]=g*b+y*Y+m*j+f*te,s[3]=x*A+v*S+_*P+C*W,s[7]=x*I+v*O+_*F+C*X,s[11]=x*L+v*z+_*G+C*$,s[15]=x*b+v*Y+_*j+C*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],y=e[7],m=e[11],f=e[15];return g*(+s*l*d-i*c*d-s*a*u+n*c*u+i*a*p-n*l*p)+y*(+t*l*p-t*c*u+s*r*u-i*r*p+i*c*h-s*l*h)+m*(+t*c*d-t*a*p-s*r*d+n*r*p+s*a*h-n*c*h)+f*(-i*a*h-t*l*d+t*a*u+i*r*d-n*r*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],y=e[13],m=e[14],f=e[15],x=d*m*c-y*u*c+y*l*p-a*m*p-d*l*f+a*u*f,v=g*u*c-h*m*c-g*l*p+r*m*p+h*l*f-r*u*f,_=h*y*c-g*d*c+g*a*p-r*y*p-h*a*f+r*d*f,C=g*d*l-h*y*l-g*a*u+r*y*u+h*a*m-r*d*m,A=t*x+n*v+i*_+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/A;return e[0]=x*I,e[1]=(y*u*s-d*m*s-y*i*p+n*m*p+d*i*f-n*u*f)*I,e[2]=(a*m*s-y*l*s+y*i*c-n*m*c-a*i*f+n*l*f)*I,e[3]=(d*l*s-a*u*s-d*i*c+n*u*c+a*i*p-n*l*p)*I,e[4]=v*I,e[5]=(h*m*s-g*u*s+g*i*p-t*m*p-h*i*f+t*u*f)*I,e[6]=(g*l*s-r*m*s-g*i*c+t*m*c+r*i*f-t*l*f)*I,e[7]=(r*u*s-h*l*s+h*i*c-t*u*c-r*i*p+t*l*p)*I,e[8]=_*I,e[9]=(g*d*s-h*y*s-g*n*p+t*y*p+h*n*f-t*d*f)*I,e[10]=(r*y*s-g*a*s+g*n*c-t*y*c-r*n*f+t*a*f)*I,e[11]=(h*a*s-r*d*s-h*n*c+t*d*c+r*n*p-t*a*p)*I,e[12]=C*I,e[13]=(h*y*i-g*d*i+g*n*u-t*y*u-h*n*m+t*d*m)*I,e[14]=(g*a*i-r*y*i-g*n*l+t*y*l+r*n*m-t*a*m)*I,e[15]=(r*d*i-h*a*i+h*n*l-t*d*l-r*n*u+t*a*u)*I,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,a=e.y,l=e.z,c=s*r,h=s*a;return this.set(c*r+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*r,0,c*l-i*a,h*l+i*r,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,r=t._y,a=t._z,l=t._w,c=s+s,h=r+r,d=a+a,u=s*c,p=s*h,g=s*d,y=r*h,m=r*d,f=a*d,x=l*c,v=l*h,_=l*d,C=n.x,A=n.y,I=n.z;return i[0]=(1-(y+f))*C,i[1]=(p+_)*C,i[2]=(g-v)*C,i[3]=0,i[4]=(p-_)*A,i[5]=(1-(u+f))*A,i[6]=(m+x)*A,i[7]=0,i[8]=(g+v)*I,i[9]=(m-x)*I,i[10]=(1-(u+y))*I,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ti.set(i[0],i[1],i[2]).length();const r=Ti.set(i[4],i[5],i[6]).length(),a=Ti.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],hn.copy(this);const c=1/s,h=1/r,d=1/a;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=d,hn.elements[9]*=d,hn.elements[10]*=d,t.setFromRotationMatrix(hn),n.x=s,n.y=r,n.z=a,this}makePerspective(e,t,n,i,s,r,a=Pn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),u=(n+i)/(n-i);let p,g;if(a===Pn)p=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(a===_r)p=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,r,a=Pn){const l=this.elements,c=1/(t-e),h=1/(n-i),d=1/(r-s),u=(t+e)*c,p=(n+i)*h;let g,y;if(a===Pn)g=(r+s)*d,y=-2*d;else if(a===_r)g=s*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ti=new T,hn=new ue,qd=new T(0,0,0),Yd=new T(1,1,1),zn=new T,zs=new T,Zt=new T,sl=new ue,rl=new ht;class Wt{constructor(e=0,t=0,n=0,i=Wt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],r=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(At(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-At(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(At(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-At(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(At(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-At(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rl.setFromEuler(this),this.setFromQuaternion(rl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wt.DEFAULT_ORDER="XYZ";class Qo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kd=0;const ol=new T,Ai=new ht,wn=new ue,Hs=new T,ls=new T,Zd=new T,Jd=new ht,al=new T(1,0,0),ll=new T(0,1,0),cl=new T(0,0,1),Qd={type:"added"},eu={type:"removed"};class rt extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rt.DEFAULT_UP.clone();const e=new T,t=new Wt,n=new ht,i=new T(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ue},normalMatrix:{value:new ze}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.premultiply(Ai),this}rotateX(e){return this.rotateOnAxis(al,e)}rotateY(e){return this.rotateOnAxis(ll,e)}rotateZ(e){return this.rotateOnAxis(cl,e)}translateOnAxis(e,t){return ol.copy(e).applyQuaternion(this.quaternion),this.position.add(ol.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(al,e)}translateY(e){return this.translateOnAxis(ll,e)}translateZ(e){return this.translateOnAxis(cl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Hs.copy(e):Hs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(ls,Hs,this.up):wn.lookAt(Hs,ls,this.up),this.quaternion.setFromRotationMatrix(wn),i&&(wn.extractRotation(i.matrixWorld),Ai.setFromRotationMatrix(wn),this.quaternion.premultiply(Ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Qd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(wn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,e,Zd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,Jd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),d=r(e.shapes),u=r(e.skeletons),p=r(e.animations),g=r(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}rt.DEFAULT_UP=new T(0,1,0);rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new T,En=new T,eo=new T,Tn=new T,Ii=new T,Ci=new T,hl=new T,to=new T,no=new T,io=new T;let Gs=!1;class fn{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),dn.subVectors(e,t),i.cross(dn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){dn.subVectors(i,t),En.subVectors(n,t),eo.subVectors(e,t);const r=dn.dot(dn),a=dn.dot(En),l=dn.dot(eo),c=En.dot(En),h=En.dot(eo),d=r*c-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,g=(r*h-a*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getUV(e,t,n,i,s,r,a,l){return Gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Gs=!0),this.getInterpolation(e,t,n,i,s,r,a,l)}static getInterpolation(e,t,n,i,s,r,a,l){return this.getBarycoord(e,t,n,i,Tn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Tn.x),l.addScaledVector(r,Tn.y),l.addScaledVector(a,Tn.z),l)}static isFrontFacing(e,t,n,i){return dn.subVectors(n,t),En.subVectors(e,t),dn.cross(En).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),En.subVectors(this.a,this.b),dn.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Gs=!0),fn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return fn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let r,a;Ii.subVectors(i,n),Ci.subVectors(s,n),to.subVectors(e,n);const l=Ii.dot(to),c=Ci.dot(to);if(l<=0&&c<=0)return t.copy(n);no.subVectors(e,i);const h=Ii.dot(no),d=Ci.dot(no);if(h>=0&&d<=h)return t.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(Ii,r);io.subVectors(e,s);const p=Ii.dot(io),g=Ci.dot(io);if(g>=0&&p<=g)return t.copy(s);const y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ci,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return hl.subVectors(s,i),a=(d-h)/(d-h+(p-g)),t.copy(i).addScaledVector(hl,a);const f=1/(m+y+u);return r=y*f,a=u*f,t.copy(n).addScaledVector(Ii,r).addScaledVector(Ci,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Oc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function so(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?o+(e-o)*6*t:t<1/2?e:t<2/3?o+(e-o)*6*(2/3-t):o}class ce{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ze.workingColorSpace){if(e=Jo(e,1),t=At(t,0,1),n=At(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=so(r,s,e+1/3),this.g=so(r,s,e),this.b=so(r,s,e-1/3)}return Ze.toWorkingColorSpace(this,i),this}setStyle(e,t=tt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=tt){const n=Oc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}copyLinearToSRGB(e){return this.r=Xr(e.r),this.g=Xr(e.g),this.b=Xr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=tt){return Ze.fromWorkingColorSpace(Pt.copy(this),e),Math.round(At(Pt.r*255,0,255))*65536+Math.round(At(Pt.g*255,0,255))*256+Math.round(At(Pt.b*255,0,255))}getHexString(e=tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(Pt.copy(this),t);const n=Pt.r,i=Pt.g,s=Pt.b,r=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+r)/2;if(a===r)l=0,c=0;else{const d=r-a;switch(c=h<=.5?d/(r+a):d/(2-r-a),r){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=tt){Ze.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,i=Pt.b;return e!==tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Hn),this.setHSL(Hn.h+e,Hn.s+t,Hn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Hn),e.getHSL(Vs);const n=ms(Hn.h,Vs.h,t),i=ms(Hn.s,Vs.s,t),s=ms(Hn.l,Vs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new ce;ce.NAMES=Oc;let tu=0;class an extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=mn(),this.name="",this.type="Material",this.blending=Wi,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ao,this.blendDst=Io,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ce(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bi,this.stencilZFail=bi,this.stencilZPass=bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ao&&(n.blendSrc=this.blendSrc),this.blendDst!==Io&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const a in s){const l=s[a];delete l.metadata,r.push(l)}return r}if(t){const s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xt extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new T,Ws=new Ee;class Ft{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Do,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ws.fromBufferAttribute(this,t),Ws.applyMatrix3(e),this.setXY(t,Ws.x,Ws.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),s=et(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Do&&(e.usage=this.usage),e}}class ea extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class zc extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ke extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}let nu=0;const en=new ue,ro=new rt,Ri=new T,Jt=new Yt,cs=new Yt,Et=new T;class mt extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bc(e)?zc:ea)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return en.makeRotationFromQuaternion(e),this.applyMatrix4(en),this}rotateX(e){return en.makeRotationX(e),this.applyMatrix4(en),this}rotateY(e){return en.makeRotationY(e),this.applyMatrix4(en),this}rotateZ(e){return en.makeRotationZ(e),this.applyMatrix4(en),this}translate(e,t,n){return en.makeTranslation(e,t,n),this.applyMatrix4(en),this}scale(e,t,n){return en.makeScale(e,t,n),this.applyMatrix4(en),this}lookAt(e){return ro.lookAt(e),ro.updateMatrix(),this.applyMatrix4(ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ke(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(e){const n=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const a=t[s];cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(Jt.min,cs.min),Jt.expandByPoint(Et),Et.addVectors(Jt.max,cs.max),Jt.expandByPoint(Et)):(Jt.expandByPoint(cs.min),Jt.expandByPoint(cs.max))}Jt.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Et.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Et));if(t)for(let s=0,r=t.length;s<r;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Et.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(e,c),Et.add(Ri)),i=Math.max(i,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,r=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let S=0;S<a;S++)c[S]=new T,h[S]=new T;const d=new T,u=new T,p=new T,g=new Ee,y=new Ee,m=new Ee,f=new T,x=new T;function v(S,O,z){d.fromArray(i,S*3),u.fromArray(i,O*3),p.fromArray(i,z*3),g.fromArray(r,S*2),y.fromArray(r,O*2),m.fromArray(r,z*2),u.sub(d),p.sub(d),y.sub(g),m.sub(g);const Y=1/(y.x*m.y-m.x*y.y);isFinite(Y)&&(f.copy(u).multiplyScalar(m.y).addScaledVector(p,-y.y).multiplyScalar(Y),x.copy(p).multiplyScalar(y.x).addScaledVector(u,-m.x).multiplyScalar(Y),c[S].add(f),c[O].add(f),c[z].add(f),h[S].add(x),h[O].add(x),h[z].add(x))}let _=this.groups;_.length===0&&(_=[{start:0,count:n.length}]);for(let S=0,O=_.length;S<O;++S){const z=_[S],Y=z.start,P=z.count;for(let F=Y,G=Y+P;F<G;F+=3)v(n[F+0],n[F+1],n[F+2])}const C=new T,A=new T,I=new T,L=new T;function b(S){I.fromArray(s,S*3),L.copy(I);const O=c[S];C.copy(O),C.sub(I.multiplyScalar(I.dot(O))).normalize(),A.crossVectors(L,O);const Y=A.dot(h[S])<0?-1:1;l[S*4]=C.x,l[S*4+1]=C.y,l[S*4+2]=C.z,l[S*4+3]=Y}for(let S=0,O=_.length;S<O;++S){const z=_[S],Y=z.start,P=z.count;for(let F=Y,G=Y+P;F<G;F+=3)b(n[F+0]),b(n[F+1]),b(n[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new T,s=new T,r=new T,a=new T,l=new T,c=new T,h=new T,d=new T;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),y=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),r.fromBufferAttribute(t,m),h.subVectors(r,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),h.subVectors(r,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new Ft(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dl=new ue,ii=new Es,$s=new gn,ul=new T,Pi=new T,Li=new T,Di=new T,oo=new T,Xs=new T,js=new Ee,qs=new Ee,Ys=new Ee,pl=new T,fl=new T,ml=new T,Ks=new T,Zs=new T;class Le extends rt{constructor(e=new mt,t=new Xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Xs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(oo.fromBufferAttribute(d,e),r?Xs.addScaledVector(oo,h):Xs.addScaledVector(oo.sub(t),h))}t.add(Xs)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(s),ii.copy(e.ray).recast(e.near),!($s.containsPoint(ii.origin)===!1&&(ii.intersectSphere($s,ul)===null||ii.origin.distanceToSquared(ul)>(e.far-e.near)**2))&&(dl.copy(s).invert(),ii.copy(e.ray).applyMatrix4(dl),!(n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ii)))}_computeIntersections(e,t,n){let i;const s=this.geometry,r=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,y=u.length;g<y;g++){const m=u[g],f=r[m.materialIndex],x=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=x,C=v;_<C;_+=3){const A=a.getX(_),I=a.getX(_+1),L=a.getX(_+2);i=Js(this,f,e,n,c,h,d,A,I,L),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const x=a.getX(m),v=a.getX(m+1),_=a.getX(m+2);i=Js(this,r,e,n,c,h,d,x,v,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,y=u.length;g<y;g++){const m=u[g],f=r[m.materialIndex],x=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=x,C=v;_<C;_+=3){const A=_,I=_+1,L=_+2;i=Js(this,f,e,n,c,h,d,A,I,L),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const x=m,v=m+1,_=m+2;i=Js(this,r,e,n,c,h,d,x,v,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function iu(o,e,t,n,i,s,r,a){let l;if(e.side===jt?l=n.intersectTriangle(r,s,i,!0,a):l=n.intersectTriangle(i,s,r,e.side===Dn,a),l===null)return null;Zs.copy(a),Zs.applyMatrix4(o.matrixWorld);const c=t.ray.origin.distanceTo(Zs);return c<t.near||c>t.far?null:{distance:c,point:Zs.clone(),object:o}}function Js(o,e,t,n,i,s,r,a,l,c){o.getVertexPosition(a,Pi),o.getVertexPosition(l,Li),o.getVertexPosition(c,Di);const h=iu(o,e,t,n,Pi,Li,Di,Ks);if(h){i&&(js.fromBufferAttribute(i,a),qs.fromBufferAttribute(i,l),Ys.fromBufferAttribute(i,c),h.uv=fn.getInterpolation(Ks,Pi,Li,Di,js,qs,Ys,new Ee)),s&&(js.fromBufferAttribute(s,a),qs.fromBufferAttribute(s,l),Ys.fromBufferAttribute(s,c),h.uv1=fn.getInterpolation(Ks,Pi,Li,Di,js,qs,Ys,new Ee),h.uv2=h.uv1),r&&(pl.fromBufferAttribute(r,a),fl.fromBufferAttribute(r,l),ml.fromBufferAttribute(r,c),h.normal=fn.getInterpolation(Ks,Pi,Li,Di,pl,fl,ml,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new T,materialIndex:0};fn.getNormal(Pi,Li,Di,d.normal),h.face=d}return h}class je extends mt{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,r,s,0),g("z","y","x",1,-1,n,t,-e,r,s,1),g("x","z","y",1,1,e,n,t,i,r,2),g("x","z","y",1,-1,e,n,-t,i,r,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(d,2));function g(y,m,f,x,v,_,C,A,I,L,b){const S=_/I,O=C/L,z=_/2,Y=C/2,P=A/2,F=I+1,G=L+1;let j=0,W=0;const X=new T;for(let $=0;$<G;$++){const te=$*O-Y;for(let ee=0;ee<F;ee++){const V=ee*S-z;X[y]=V*x,X[m]=te*v,X[f]=P,c.push(X.x,X.y,X.z),X[y]=0,X[m]=0,X[f]=A>0?1:-1,h.push(X.x,X.y,X.z),d.push(ee/I),d.push(1-$/L),j+=1}}for(let $=0;$<L;$++)for(let te=0;te<I;te++){const ee=u+te+F*$,V=u+te+F*($+1),q=u+(te+1)+F*($+1),oe=u+(te+1)+F*$;l.push(ee,V,oe),l.push(V,q,oe),W+=6}a.addGroup(p,W,b),p+=W,u+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new je(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Qi(o){const e={};for(const t in o){e[t]={};for(const n in o[t]){const i=o[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ot(o){const e={};for(let t=0;t<o.length;t++){const n=Qi(o[t]);for(const i in n)e[i]=n[i]}return e}function su(o){const e=[];for(let t=0;t<o.length;t++)e.push(o[t].clone());return e}function Hc(o){return o.getRenderTarget()===null?o.outputColorSpace:Ze.workingColorSpace}const ru={clone:Qi,merge:Ot};var ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,au=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ou,this.fragmentShader=au,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=su(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Gc extends rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=Pn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class _t extends Gc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ji*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ji*2*Math.atan(Math.tan(fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/l,t-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Fi=-90,Bi=1;class lu extends rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new _t(Fi,Bi,e,t);i.layers=this.layers,this.add(i);const s=new _t(Fi,Bi,e,t);s.layers=this.layers,this.add(s);const r=new _t(Fi,Bi,e,t);r.layers=this.layers,this.add(r);const a=new _t(Fi,Bi,e,t);a.layers=this.layers,this.add(a);const l=new _t(Fi,Bi,e,t);l.layers=this.layers,this.add(l);const c=new _t(Fi,Bi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,a,l]=t;for(const c of t)this.remove(c);if(e===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_r)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Vc extends xt{constructor(e,t,n,i,s,r,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:qi,super(e,t,n,i,s,r,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cu extends fi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(gs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===di?tt:rn),this.texture=new Vc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Vt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new je(5,5,5),s=new mi({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:Yn});s.uniforms.tEquirect.value=t;const r=new Le(i,s),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=Vt),new lu(1,10,this).update(e,r),t.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}}const ao=new T,hu=new T,du=new ze;class Wn{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ao.subVectors(n,t).cross(hu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ao),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||du.getNormalMatrix(e),i=this.coplanarPoint(ao).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const si=new gn,Qs=new T;class ta{constructor(e=new Wn,t=new Wn,n=new Wn,i=new Wn,s=new Wn,r=new Wn){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pn){const n=this.planes,i=e.elements,s=i[0],r=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],p=i[8],g=i[9],y=i[10],m=i[11],f=i[12],x=i[13],v=i[14],_=i[15];if(n[0].setComponents(l-s,u-c,m-p,_-f).normalize(),n[1].setComponents(l+s,u+c,m+p,_+f).normalize(),n[2].setComponents(l+r,u+h,m+g,_+x).normalize(),n[3].setComponents(l-r,u-h,m-g,_-x).normalize(),n[4].setComponents(l-a,u-d,m-y,_-v).normalize(),t===Pn)n[5].setComponents(l+a,u+d,m+y,_+v).normalize();else if(t===_r)n[5].setComponents(a,d,y,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(e){return si.center.set(0,0,0),si.radius=.7071067811865476,si.applyMatrix4(e.matrixWorld),this.intersectsSphere(si)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Qs.x=i.normal.x>0?e.max.x:e.min.x,Qs.y=i.normal.y>0?e.max.y:e.min.y,Qs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wc(){let o=null,e=!1,t=null,n=null;function i(s,r){t(s,r),n=o.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=o.requestAnimationFrame(i),e=!0)},stop:function(){o.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){o=s}}}function uu(o,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const d=c.array,u=c.usage,p=d.byteLength,g=o.createBuffer();o.bindBuffer(h,g),o.bufferData(h,d,u),c.onUploadCallback();let y;if(d instanceof Float32Array)y=o.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)y=o.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=o.UNSIGNED_SHORT;else if(d instanceof Int16Array)y=o.SHORT;else if(d instanceof Uint32Array)y=o.UNSIGNED_INT;else if(d instanceof Int32Array)y=o.INT;else if(d instanceof Int8Array)y=o.BYTE;else if(d instanceof Uint8Array)y=o.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)y=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:y,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,h,d){const u=h.array,p=h._updateRange,g=h.updateRanges;if(o.bindBuffer(d,c),p.count===-1&&g.length===0&&o.bufferSubData(d,0,u),g.length!==0){for(let y=0,m=g.length;y<m;y++){const f=g[y];t?o.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u,f.start,f.count):o.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?o.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u,p.offset,p.count):o.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(o.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,i(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,c,h),d.version=c.version}}return{get:r,remove:a,update:l}}class Ts extends mt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,r=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=e/a,u=t/l,p=[],g=[],y=[],m=[];for(let f=0;f<h;f++){const x=f*u-r;for(let v=0;v<c;v++){const _=v*d-s;g.push(_,-x,0),y.push(0,0,1),m.push(v/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<a;x++){const v=x+c*f,_=x+c*(f+1),C=x+1+c*(f+1),A=x+1+c*f;p.push(v,_,A),p.push(_,C,A)}this.setIndex(p),this.setAttribute("position",new Ke(g,3)),this.setAttribute("normal",new Ke(y,3)),this.setAttribute("uv",new Ke(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ts(e.width,e.height,e.widthSegments,e.heightSegments)}}var pu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,vu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_u=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Mu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Su=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Eu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Au=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Bu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Uu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ku=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Nu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ou=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,$u=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Xu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ju=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ku=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ju=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ep=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,op=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ap=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,up=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,xp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,_p=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ep=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Ip=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Rp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Up=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Np=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Op=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Gp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$p=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Yp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Zp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ef=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,of=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,af=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,uf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ff=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_f=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,bf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Af=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Df=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ff=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Nf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Of=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$f=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:pu,alphahash_pars_fragment:fu,alphamap_fragment:mu,alphamap_pars_fragment:gu,alphatest_fragment:yu,alphatest_pars_fragment:vu,aomap_fragment:xu,aomap_pars_fragment:_u,batching_pars_vertex:bu,batching_vertex:Mu,begin_vertex:Su,beginnormal_vertex:wu,bsdfs:Eu,iridescence_fragment:Tu,bumpmap_pars_fragment:Au,clipping_planes_fragment:Iu,clipping_planes_pars_fragment:Cu,clipping_planes_pars_vertex:Ru,clipping_planes_vertex:Pu,color_fragment:Lu,color_pars_fragment:Du,color_pars_vertex:Fu,color_vertex:Bu,common:Uu,cube_uv_reflection_fragment:ku,defaultnormal_vertex:Nu,displacementmap_pars_vertex:Ou,displacementmap_vertex:zu,emissivemap_fragment:Hu,emissivemap_pars_fragment:Gu,colorspace_fragment:Vu,colorspace_pars_fragment:Wu,envmap_fragment:$u,envmap_common_pars_fragment:Xu,envmap_pars_fragment:ju,envmap_pars_vertex:qu,envmap_physical_pars_fragment:op,envmap_vertex:Yu,fog_vertex:Ku,fog_pars_vertex:Zu,fog_fragment:Ju,fog_pars_fragment:Qu,gradientmap_pars_fragment:ep,lightmap_fragment:tp,lightmap_pars_fragment:np,lights_lambert_fragment:ip,lights_lambert_pars_fragment:sp,lights_pars_begin:rp,lights_toon_fragment:ap,lights_toon_pars_fragment:lp,lights_phong_fragment:cp,lights_phong_pars_fragment:hp,lights_physical_fragment:dp,lights_physical_pars_fragment:up,lights_fragment_begin:pp,lights_fragment_maps:fp,lights_fragment_end:mp,logdepthbuf_fragment:gp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:vp,logdepthbuf_vertex:xp,map_fragment:_p,map_pars_fragment:bp,map_particle_fragment:Mp,map_particle_pars_fragment:Sp,metalnessmap_fragment:wp,metalnessmap_pars_fragment:Ep,morphcolor_vertex:Tp,morphnormal_vertex:Ap,morphtarget_pars_vertex:Ip,morphtarget_vertex:Cp,normal_fragment_begin:Rp,normal_fragment_maps:Pp,normal_pars_fragment:Lp,normal_pars_vertex:Dp,normal_vertex:Fp,normalmap_pars_fragment:Bp,clearcoat_normal_fragment_begin:Up,clearcoat_normal_fragment_maps:kp,clearcoat_pars_fragment:Np,iridescence_pars_fragment:Op,opaque_fragment:zp,packing:Hp,premultiplied_alpha_fragment:Gp,project_vertex:Vp,dithering_fragment:Wp,dithering_pars_fragment:$p,roughnessmap_fragment:Xp,roughnessmap_pars_fragment:jp,shadowmap_pars_fragment:qp,shadowmap_pars_vertex:Yp,shadowmap_vertex:Kp,shadowmask_pars_fragment:Zp,skinbase_vertex:Jp,skinning_pars_vertex:Qp,skinning_vertex:ef,skinnormal_vertex:tf,specularmap_fragment:nf,specularmap_pars_fragment:sf,tonemapping_fragment:rf,tonemapping_pars_fragment:of,transmission_fragment:af,transmission_pars_fragment:lf,uv_pars_fragment:cf,uv_pars_vertex:hf,uv_vertex:df,worldpos_vertex:uf,background_vert:pf,background_frag:ff,backgroundCube_vert:mf,backgroundCube_frag:gf,cube_vert:yf,cube_frag:vf,depth_vert:xf,depth_frag:_f,distanceRGBA_vert:bf,distanceRGBA_frag:Mf,equirect_vert:Sf,equirect_frag:wf,linedashed_vert:Ef,linedashed_frag:Tf,meshbasic_vert:Af,meshbasic_frag:If,meshlambert_vert:Cf,meshlambert_frag:Rf,meshmatcap_vert:Pf,meshmatcap_frag:Lf,meshnormal_vert:Df,meshnormal_frag:Ff,meshphong_vert:Bf,meshphong_frag:Uf,meshphysical_vert:kf,meshphysical_frag:Nf,meshtoon_vert:Of,meshtoon_frag:zf,points_vert:Hf,points_frag:Gf,shadow_vert:Vf,shadow_frag:Wf,sprite_vert:$f,sprite_frag:Xf},ie={common:{diffuse:{value:new ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new ce(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},vn={basic:{uniforms:Ot([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Ot([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ce(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Ot([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ce(0)},specular:{value:new ce(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Ot([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Ot([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new ce(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Ot([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Ot([ie.points,ie.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Ot([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Ot([ie.common,ie.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Ot([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Ot([ie.sprite,ie.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Ot([ie.common,ie.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Ot([ie.lights,ie.fog,{color:{value:new ce(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};vn.physical={uniforms:Ot([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new ce(0)},specularColor:{value:new ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const er={r:0,b:0,g:0};function jf(o,e,t,n,i,s,r){const a=new ce(0);let l=s===!0?0:1,c,h,d=null,u=0,p=null;function g(m,f){let x=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?y(a,l):v&&v.isColor&&(y(v,1),x=!0);const _=o.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,r):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(o.autoClear||x)&&o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Er)?(h===void 0&&(h=new Le(new je(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:Qi(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=Ze.getTransfer(v.colorSpace)!==ot,(d!==v||u!==v.version||p!==o.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,p=o.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Le(new Ts(2,2),new mi({name:"BackgroundMaterial",uniforms:Qi(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(v.colorSpace)!==ot,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||p!==o.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,p=o.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function y(m,f){m.getRGB(er,Hc(o)),n.buffers.color.setClear(er.r,er.g,er.b,f,r)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),l=f,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(a,l)},render:g}}function qf(o,e,t,n){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),r=n.isWebGL2||s!==null,a={},l=m(null);let c=l,h=!1;function d(P,F,G,j,W){let X=!1;if(r){const $=y(j,G,F);c!==$&&(c=$,p(c.object)),X=f(P,j,G,W),X&&x(P,j,G,W)}else{const $=F.wireframe===!0;(c.geometry!==j.id||c.program!==G.id||c.wireframe!==$)&&(c.geometry=j.id,c.program=G.id,c.wireframe=$,X=!0)}W!==null&&t.update(W,o.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,L(P,F,G,j),W!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function u(){return n.isWebGL2?o.createVertexArray():s.createVertexArrayOES()}function p(P){return n.isWebGL2?o.bindVertexArray(P):s.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?o.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function y(P,F,G){const j=G.wireframe===!0;let W=a[P.id];W===void 0&&(W={},a[P.id]=W);let X=W[F.id];X===void 0&&(X={},W[F.id]=X);let $=X[j];return $===void 0&&($=m(u()),X[j]=$),$}function m(P){const F=[],G=[],j=[];for(let W=0;W<i;W++)F[W]=0,G[W]=0,j[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:j,object:P,attributes:{},index:null}}function f(P,F,G,j){const W=c.attributes,X=F.attributes;let $=0;const te=G.getAttributes();for(const ee in te)if(te[ee].location>=0){const q=W[ee];let oe=X[ee];if(oe===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(oe=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(oe=P.instanceColor)),q===void 0||q.attribute!==oe||oe&&q.data!==oe.data)return!0;$++}return c.attributesNum!==$||c.index!==j}function x(P,F,G,j){const W={},X=F.attributes;let $=0;const te=G.getAttributes();for(const ee in te)if(te[ee].location>=0){let q=X[ee];q===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(q=P.instanceColor));const oe={};oe.attribute=q,q&&q.data&&(oe.data=q.data),W[ee]=oe,$++}c.attributes=W,c.attributesNum=$,c.index=j}function v(){const P=c.newAttributes;for(let F=0,G=P.length;F<G;F++)P[F]=0}function _(P){C(P,0)}function C(P,F){const G=c.newAttributes,j=c.enabledAttributes,W=c.attributeDivisors;G[P]=1,j[P]===0&&(o.enableVertexAttribArray(P),j[P]=1),W[P]!==F&&((n.isWebGL2?o:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,F),W[P]=F)}function A(){const P=c.newAttributes,F=c.enabledAttributes;for(let G=0,j=F.length;G<j;G++)F[G]!==P[G]&&(o.disableVertexAttribArray(G),F[G]=0)}function I(P,F,G,j,W,X,$){$===!0?o.vertexAttribIPointer(P,F,G,W,X):o.vertexAttribPointer(P,F,G,j,W,X)}function L(P,F,G,j){if(n.isWebGL2===!1&&(P.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const W=j.attributes,X=G.getAttributes(),$=F.defaultAttributeValues;for(const te in X){const ee=X[te];if(ee.location>=0){let V=W[te];if(V===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(V=P.instanceColor)),V!==void 0){const q=V.normalized,oe=V.itemSize,fe=t.get(V);if(fe===void 0)continue;const pe=fe.buffer,Ae=fe.type,De=fe.bytesPerElement,Se=n.isWebGL2===!0&&(Ae===o.INT||Ae===o.UNSIGNED_INT||V.gpuType===wc);if(V.isInterleavedBufferAttribute){const qe=V.data,B=qe.stride,Bt=V.offset;if(qe.isInstancedInterleavedBuffer){for(let xe=0;xe<ee.locationSize;xe++)C(ee.location+xe,qe.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=qe.meshPerAttribute*qe.count)}else for(let xe=0;xe<ee.locationSize;xe++)_(ee.location+xe);o.bindBuffer(o.ARRAY_BUFFER,pe);for(let xe=0;xe<ee.locationSize;xe++)I(ee.location+xe,oe/ee.locationSize,Ae,q,B*De,(Bt+oe/ee.locationSize*xe)*De,Se)}else{if(V.isInstancedBufferAttribute){for(let qe=0;qe<ee.locationSize;qe++)C(ee.location+qe,V.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let qe=0;qe<ee.locationSize;qe++)_(ee.location+qe);o.bindBuffer(o.ARRAY_BUFFER,pe);for(let qe=0;qe<ee.locationSize;qe++)I(ee.location+qe,oe/ee.locationSize,Ae,q,oe*De,oe/ee.locationSize*qe*De,Se)}}else if($!==void 0){const q=$[te];if(q!==void 0)switch(q.length){case 2:o.vertexAttrib2fv(ee.location,q);break;case 3:o.vertexAttrib3fv(ee.location,q);break;case 4:o.vertexAttrib4fv(ee.location,q);break;default:o.vertexAttrib1fv(ee.location,q)}}}}A()}function b(){z();for(const P in a){const F=a[P];for(const G in F){const j=F[G];for(const W in j)g(j[W].object),delete j[W];delete F[G]}delete a[P]}}function S(P){if(a[P.id]===void 0)return;const F=a[P.id];for(const G in F){const j=F[G];for(const W in j)g(j[W].object),delete j[W];delete F[G]}delete a[P.id]}function O(P){for(const F in a){const G=a[F];if(G[P.id]===void 0)continue;const j=G[P.id];for(const W in j)g(j[W].object),delete j[W];delete G[P.id]}}function z(){Y(),h=!0,c!==l&&(c=l,p(c.object))}function Y(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:z,resetDefaultState:Y,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfProgram:O,initAttributes:v,enableAttribute:_,disableUnusedAttributes:A}}function Yf(o,e,t,n){const i=n.isWebGL2;let s;function r(h){s=h}function a(h,d){o.drawArrays(s,h,d),t.update(d,s,1)}function l(h,d,u){if(u===0)return;let p,g;if(i)p=o,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](s,h,d,u),t.update(d,s,u)}function c(h,d,u){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{p.multiDrawArraysWEBGL(s,h,0,d,0,u);let g=0;for(let y=0;y<u;y++)g+=d[y];t.update(g,s,1)}}this.setMode=r,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Kf(o,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");n=o.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(I){if(I==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const r=typeof WebGL2RenderingContext<"u"&&o.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=r||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),u=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=o.getParameter(o.MAX_TEXTURE_SIZE),g=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),y=o.getParameter(o.MAX_VERTEX_ATTRIBS),m=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),f=o.getParameter(o.MAX_VARYING_VECTORS),x=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),v=u>0,_=r||e.has("OES_texture_float"),C=v&&_,A=r?o.getParameter(o.MAX_SAMPLES):0;return{isWebGL2:r,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:p,maxCubemapSize:g,maxAttributes:y,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:_,floatVertexTextures:C,maxSamples:A}}function Zf(o){const e=this;let t=null,n=0,i=!1,s=!1;const r=new Wn,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||i;return i=u,n=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,f=o.get(d);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const x=s?0:n,v=x*4;let _=f.clippingState||null;l.value=_,_=h(g,u,v,p);for(let C=0;C!==v;++C)_[C]=t[C];f.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,g){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const f=p+y*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,_=p;v!==y;++v,_+=4)r.copy(d[v]).applyMatrix4(x,a),r.normal.toArray(m,_),m[_+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function Jf(o){let e=new WeakMap;function t(r,a){return a===fr?r.mapping=qi:a===Co&&(r.mapping=Yi),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===fr||a===Co)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new cu(l.height/2);return c.fromEquirectangularTexture(o,r),e.set(r,c),r.addEventListener("dispose",i),t(c.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Ir extends Gc{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,r=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Hi=4,gl=[.125,.215,.35,.446,.526,.582],li=20,lo=new Ir,yl=new ce;let co=null,ho=0,uo=0;const oi=(1+Math.sqrt(5))/2,Ui=1/oi,vl=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,oi,Ui),new T(0,oi,-Ui),new T(Ui,0,oi),new T(-Ui,0,oi),new T(oi,Ui,0),new T(-oi,Ui,0)];class xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){co=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),uo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(co,ho,uo),e.scissorTest=!1,tr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qi||e.mapping===Yi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),co=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),uo=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:vs,format:sn,colorSpace:It,depthBuffer:!1},i=_l(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_l(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qf(s)),this._blurMaterial=em(s,e,t)}return i}_compileMaterial(e){const t=new Le(this._lodPlanes[0],e);this._renderer.compile(t,lo)}_sceneToCubeUV(e,t,n,i){const a=new _t(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(yl),h.toneMapping=Kn,h.autoClear=!1;const p=new Xt({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),g=new Le(new je,p);let y=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(yl),y=!0);for(let f=0;f<6;f++){const x=f%3;x===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):x===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const v=this._cubeSize;tr(i,x*v,f>2?v:0,v,v),h.setRenderTarget(i),y&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===qi||e.mapping===Yi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bl());const s=i?this._cubemapMaterial:this._equirectMaterial,r=new Le(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;tr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,lo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),r=vl[(i-1)%vl.length];this._blur(e,i-1,i,s,r)}t.autoClear=n}_blur(e,t,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Le(this._lodPlanes[i],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*li-1),y=s/g,m=isFinite(s)?1+Math.floor(h*y):li;m>li&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${li}`);const f=[];let x=0;for(let I=0;I<li;++I){const L=I/y,b=Math.exp(-L*L/2);f.push(b),I===0?x+=b:I<m&&(x+=2*b)}for(let I=0;I<f.length;I++)f[I]=f[I]/x;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=r==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;const _=this._sizeLods[i],C=3*_*(i>v-Hi?i-v+Hi:0),A=4*(this._cubeSize-_);tr(t,C,A,3*_,2*_),l.setRenderTarget(t),l.render(d,lo)}}function Qf(o){const e=[],t=[],n=[];let i=o;const s=o-Hi+1+gl.length;for(let r=0;r<s;r++){const a=Math.pow(2,i);t.push(a);let l=1/a;r>o-Hi?l=gl[r-o+Hi-1]:r===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,y=3,m=2,f=1,x=new Float32Array(y*g*p),v=new Float32Array(m*g*p),_=new Float32Array(f*g*p);for(let A=0;A<p;A++){const I=A%3*2/3-1,L=A>2?0:-1,b=[I,L,0,I+2/3,L,0,I+2/3,L+1,0,I,L,0,I+2/3,L+1,0,I,L+1,0];x.set(b,y*g*A),v.set(u,m*g*A);const S=[A,A,A,A,A,A];_.set(S,f*g*A)}const C=new mt;C.setAttribute("position",new Ft(x,y)),C.setAttribute("uv",new Ft(v,m)),C.setAttribute("faceIndex",new Ft(_,f)),e.push(C),i>Hi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function _l(o,e,t){const n=new fi(o,e,t);return n.texture.mapping=Er,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function tr(o,e,t,n,i){o.viewport.set(e,t,n,i),o.scissor.set(e,t,n,i)}function em(o,e,t){const n=new Float32Array(li),i=new T(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function bl(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Ml(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function na(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function tm(o){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===fr||l===Co,h=l===qi||l===Yi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new xl(o)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(c&&d&&d.height>0||h&&d&&i(d)){t===null&&(t=new xl(o));const u=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,u),a.addEventListener("dispose",s),u.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function nm(o){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=o.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function im(o,e,t,n){const i={},s=new WeakMap;function r(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const y=u.morphAttributes[g];for(let m=0,f=y.length;m<f;m++)e.remove(y[m])}u.removeEventListener("dispose",r),delete i[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)e.update(u[g],o.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const y=p[g];for(let m=0,f=y.length;m<f;m++)e.update(y[m],o.ARRAY_BUFFER)}}function c(d){const u=[],p=d.index,g=d.attributes.position;let y=0;if(p!==null){const x=p.array;y=p.version;for(let v=0,_=x.length;v<_;v+=3){const C=x[v+0],A=x[v+1],I=x[v+2];u.push(C,A,A,I,I,C)}}else if(g!==void 0){const x=g.array;y=g.version;for(let v=0,_=x.length/3-1;v<_;v+=3){const C=v+0,A=v+1,I=v+2;u.push(C,A,A,I,I,C)}}else return;const m=new(Bc(u)?zc:ea)(u,1);m.version=y;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function h(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function sm(o,e,t,n){const i=n.isWebGL2;let s;function r(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function h(p,g){o.drawElements(s,g,a,p*l),t.update(g,s,1)}function d(p,g,y){if(y===0)return;let m,f;if(i)m=o,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](s,g,a,p*l,y),t.update(g,s,y)}function u(p,g,y){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<y;f++)this.render(p[f]/l,g[f]);else{m.multiDrawElementsWEBGL(s,g,0,a,p,0,y);let f=0;for(let x=0;x<y;x++)f+=g[x];t.update(f,s,1)}}this.setMode=r,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function rm(o){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,a){switch(t.calls++,r){case o.TRIANGLES:t.triangles+=a*(s/3);break;case o.LINES:t.lines+=a*(s/2);break;case o.LINE_STRIP:t.lines+=a*(s-1);break;case o.LINE_LOOP:t.lines+=a*s;break;case o.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function om(o,e){return o[0]-e[0]}function am(o,e){return Math.abs(e[1])-Math.abs(o[1])}function lm(o,e,t){const n={},i=new Float32Array(8),s=new WeakMap,r=new Ye,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,y=g!==void 0?g.length:0;let m=s.get(h);if(m===void 0||m.count!==y){let F=function(){Y.dispose(),s.delete(h),h.removeEventListener("dispose",F)};var p=F;m!==void 0&&m.texture.dispose();const v=h.morphAttributes.position!==void 0,_=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],I=h.morphAttributes.normal||[],L=h.morphAttributes.color||[];let b=0;v===!0&&(b=1),_===!0&&(b=2),C===!0&&(b=3);let S=h.attributes.position.count*b,O=1;S>e.maxTextureSize&&(O=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const z=new Float32Array(S*O*4*y),Y=new Nc(z,S,O,y);Y.type=Rn,Y.needsUpdate=!0;const P=b*4;for(let G=0;G<y;G++){const j=A[G],W=I[G],X=L[G],$=S*O*4*G;for(let te=0;te<j.count;te++){const ee=te*P;v===!0&&(r.fromBufferAttribute(j,te),z[$+ee+0]=r.x,z[$+ee+1]=r.y,z[$+ee+2]=r.z,z[$+ee+3]=0),_===!0&&(r.fromBufferAttribute(W,te),z[$+ee+4]=r.x,z[$+ee+5]=r.y,z[$+ee+6]=r.z,z[$+ee+7]=0),C===!0&&(r.fromBufferAttribute(X,te),z[$+ee+8]=r.x,z[$+ee+9]=r.y,z[$+ee+10]=r.z,z[$+ee+11]=X.itemSize===4?r.w:1)}}m={count:y,texture:Y,size:new Ee(S,O)},s.set(h,m),h.addEventListener("dispose",F)}let f=0;for(let v=0;v<u.length;v++)f+=u[v];const x=h.morphTargetsRelative?1:1-f;d.getUniforms().setValue(o,"morphTargetBaseInfluence",x),d.getUniforms().setValue(o,"morphTargetInfluences",u),d.getUniforms().setValue(o,"morphTargetsTexture",m.texture,t),d.getUniforms().setValue(o,"morphTargetsTextureSize",m.size)}else{const g=u===void 0?0:u.length;let y=n[h.id];if(y===void 0||y.length!==g){y=[];for(let _=0;_<g;_++)y[_]=[_,0];n[h.id]=y}for(let _=0;_<g;_++){const C=y[_];C[0]=_,C[1]=u[_]}y.sort(am);for(let _=0;_<8;_++)_<g&&y[_][1]?(a[_][0]=y[_][0],a[_][1]=y[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(om);const m=h.morphAttributes.position,f=h.morphAttributes.normal;let x=0;for(let _=0;_<8;_++){const C=a[_],A=C[0],I=C[1];A!==Number.MAX_SAFE_INTEGER&&I?(m&&h.getAttribute("morphTarget"+_)!==m[A]&&h.setAttribute("morphTarget"+_,m[A]),f&&h.getAttribute("morphNormal"+_)!==f[A]&&h.setAttribute("morphNormal"+_,f[A]),i[_]=I,x+=I):(m&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),f&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),i[_]=0)}const v=h.morphTargetsRelative?1:1-x;d.getUniforms().setValue(o,"morphTargetBaseInfluence",v),d.getUniforms().setValue(o,"morphTargetInfluences",i)}}return{update:l}}function cm(o,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,o.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,o.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function r(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}class $c extends xt{constructor(e,t,n,i,s,r,a,l,c,h){if(h=h!==void 0?h:hi,h!==hi&&h!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===hi&&(n=Xn),n===void 0&&h===Ki&&(n=ci),super(null,i,s,r,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Tt,this.minFilter=l!==void 0?l:Tt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Xc=new xt,jc=new $c(1,1);jc.compareFunction=Fc;const qc=new Nc,Yc=new Xd,Kc=new Vc,Sl=[],wl=[],El=new Float32Array(16),Tl=new Float32Array(9),Al=new Float32Array(4);function es(o,e,t){const n=o[0];if(n<=0||n>0)return o;const i=e*t;let s=Sl[i];if(s===void 0&&(s=new Float32Array(i),Sl[i]=s),e!==0){n.toArray(s,0);for(let r=1,a=0;r!==e;++r)a+=t,o[r].toArray(s,a)}return s}function bt(o,e){if(o.length!==e.length)return!1;for(let t=0,n=o.length;t<n;t++)if(o[t]!==e[t])return!1;return!0}function Mt(o,e){for(let t=0,n=e.length;t<n;t++)o[t]=e[t]}function Cr(o,e){let t=wl[e];t===void 0&&(t=new Int32Array(e),wl[e]=t);for(let n=0;n!==e;++n)t[n]=o.allocateTextureUnit();return t}function hm(o,e){const t=this.cache;t[0]!==e&&(o.uniform1f(this.addr,e),t[0]=e)}function dm(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;o.uniform2fv(this.addr,e),Mt(t,e)}}function um(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;o.uniform3fv(this.addr,e),Mt(t,e)}}function pm(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;o.uniform4fv(this.addr,e),Mt(t,e)}}function fm(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;o.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(bt(t,n))return;Al.set(n),o.uniformMatrix2fv(this.addr,!1,Al),Mt(t,n)}}function mm(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;o.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(bt(t,n))return;Tl.set(n),o.uniformMatrix3fv(this.addr,!1,Tl),Mt(t,n)}}function gm(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;o.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(bt(t,n))return;El.set(n),o.uniformMatrix4fv(this.addr,!1,El),Mt(t,n)}}function ym(o,e){const t=this.cache;t[0]!==e&&(o.uniform1i(this.addr,e),t[0]=e)}function vm(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;o.uniform2iv(this.addr,e),Mt(t,e)}}function xm(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;o.uniform3iv(this.addr,e),Mt(t,e)}}function _m(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;o.uniform4iv(this.addr,e),Mt(t,e)}}function bm(o,e){const t=this.cache;t[0]!==e&&(o.uniform1ui(this.addr,e),t[0]=e)}function Mm(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;o.uniform2uiv(this.addr,e),Mt(t,e)}}function Sm(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;o.uniform3uiv(this.addr,e),Mt(t,e)}}function wm(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;o.uniform4uiv(this.addr,e),Mt(t,e)}}function Em(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i);const s=this.type===o.SAMPLER_2D_SHADOW?jc:Xc;t.setTexture2D(e||s,i)}function Tm(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Yc,i)}function Am(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Kc,i)}function Im(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||qc,i)}function Cm(o){switch(o){case 5126:return hm;case 35664:return dm;case 35665:return um;case 35666:return pm;case 35674:return fm;case 35675:return mm;case 35676:return gm;case 5124:case 35670:return ym;case 35667:case 35671:return vm;case 35668:case 35672:return xm;case 35669:case 35673:return _m;case 5125:return bm;case 36294:return Mm;case 36295:return Sm;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return Tm;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return Im}}function Rm(o,e){o.uniform1fv(this.addr,e)}function Pm(o,e){const t=es(e,this.size,2);o.uniform2fv(this.addr,t)}function Lm(o,e){const t=es(e,this.size,3);o.uniform3fv(this.addr,t)}function Dm(o,e){const t=es(e,this.size,4);o.uniform4fv(this.addr,t)}function Fm(o,e){const t=es(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,t)}function Bm(o,e){const t=es(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,t)}function Um(o,e){const t=es(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,t)}function km(o,e){o.uniform1iv(this.addr,e)}function Nm(o,e){o.uniform2iv(this.addr,e)}function Om(o,e){o.uniform3iv(this.addr,e)}function zm(o,e){o.uniform4iv(this.addr,e)}function Hm(o,e){o.uniform1uiv(this.addr,e)}function Gm(o,e){o.uniform2uiv(this.addr,e)}function Vm(o,e){o.uniform3uiv(this.addr,e)}function Wm(o,e){o.uniform4uiv(this.addr,e)}function $m(o,e,t){const n=this.cache,i=e.length,s=Cr(t,i);bt(n,s)||(o.uniform1iv(this.addr,s),Mt(n,s));for(let r=0;r!==i;++r)t.setTexture2D(e[r]||Xc,s[r])}function Xm(o,e,t){const n=this.cache,i=e.length,s=Cr(t,i);bt(n,s)||(o.uniform1iv(this.addr,s),Mt(n,s));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||Yc,s[r])}function jm(o,e,t){const n=this.cache,i=e.length,s=Cr(t,i);bt(n,s)||(o.uniform1iv(this.addr,s),Mt(n,s));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||Kc,s[r])}function qm(o,e,t){const n=this.cache,i=e.length,s=Cr(t,i);bt(n,s)||(o.uniform1iv(this.addr,s),Mt(n,s));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||qc,s[r])}function Ym(o){switch(o){case 5126:return Rm;case 35664:return Pm;case 35665:return Lm;case 35666:return Dm;case 35674:return Fm;case 35675:return Bm;case 35676:return Um;case 5124:case 35670:return km;case 35667:case 35671:return Nm;case 35668:case 35672:return Om;case 35669:case 35673:return zm;case 5125:return Hm;case 36294:return Gm;case 36295:return Vm;case 36296:return Wm;case 35678:case 36198:case 36298:case 36306:case 35682:return $m;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return jm;case 36289:case 36303:case 36311:case 36292:return qm}}class Km{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cm(t.type)}}class Zm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ym(t.type)}}class Jm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const po=/(\w+)(\])?(\[|\.)?/g;function Il(o,e){o.seq.push(e),o.map[e.id]=e}function Qm(o,e,t){const n=o.name,i=n.length;for(po.lastIndex=0;;){const s=po.exec(n),r=po.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===i){Il(t,c===void 0?new Km(a,o,e):new Zm(a,o,e));break}else{let d=t.map[a];d===void 0&&(d=new Jm(a),Il(t,d)),t=d}}}class ur{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),r=e.getUniformLocation(t,s.name);Qm(s,r,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function Cl(o,e,t){const n=o.createShader(e);return o.shaderSource(n,t),o.compileShader(n),n}const eg=37297;let tg=0;function ng(o,e){const t=o.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=i;r<s;r++){const a=r+1;n.push(`${a===e?">":" "} ${a}: ${t[r]}`)}return n.join(`
`)}function ig(o){const e=Ze.getPrimaries(Ze.workingColorSpace),t=Ze.getPrimaries(o);let n;switch(e===t?n="":e===xr&&t===vr?n="LinearDisplayP3ToLinearSRGB":e===vr&&t===xr&&(n="LinearSRGBToLinearDisplayP3"),o){case It:case Ar:return[n,"LinearTransferOETF"];case tt:case Zo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",o),[n,"LinearTransferOETF"]}}function Rl(o,e,t){const n=o.getShaderParameter(e,o.COMPILE_STATUS),i=o.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const r=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+ng(o.getShaderSource(e),r)}else return i}function sg(o,e){const t=ig(e);return`vec4 ${o}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function rg(o,e){let t;switch(e){case ed:t="Linear";break;case td:t="Reinhard";break;case nd:t="OptimizedCineon";break;case bc:t="ACESFilmic";break;case sd:t="AgX";break;case id:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+o+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function og(o){return[o.extensionDerivatives||o.envMapCubeUVHeight||o.bumpMap||o.normalMapTangentSpace||o.clearcoatNormalMap||o.flatShading||o.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(o.extensionFragDepth||o.logarithmicDepthBuffer)&&o.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",o.extensionDrawBuffers&&o.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(o.extensionShaderTextureLOD||o.envMap||o.transmission)&&o.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Gi).join(`
`)}function ag(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Gi).join(`
`)}function lg(o){const e=[];for(const t in o){const n=o[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cg(o,e){const t={},n=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=o.getActiveAttrib(e,i),r=s.name;let a=1;s.type===o.FLOAT_MAT2&&(a=2),s.type===o.FLOAT_MAT3&&(a=3),s.type===o.FLOAT_MAT4&&(a=4),t[r]={type:s.type,location:o.getAttribLocation(e,r),locationSize:a}}return t}function Gi(o){return o!==""}function Pl(o,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ll(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uo(o){return o.replace(hg,ug)}const dg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ug(o,e){let t=Be[e];if(t===void 0){const n=dg.get(e);if(n!==void 0)t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Uo(t)}const pg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(o){return o.replace(pg,fg)}function fg(o,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Fl(o){let e="precision "+o.precision+` float;
precision `+o.precision+" int;";return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function mg(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===_c?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===qo?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===In&&(e="SHADOWMAP_TYPE_VSM"),e}function gg(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case qi:case Yi:e="ENVMAP_TYPE_CUBE";break;case Er:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yg(o){let e="ENVMAP_MODE_REFLECTION";return o.envMap&&o.envMapMode===Yi&&(e="ENVMAP_MODE_REFRACTION"),e}function vg(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case wr:e="ENVMAP_BLENDING_MULTIPLY";break;case Jh:e="ENVMAP_BLENDING_MIX";break;case Qh:e="ENVMAP_BLENDING_ADD";break}return e}function xg(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function _g(o,e,t,n){const i=o.getContext(),s=t.defines;let r=t.vertexShader,a=t.fragmentShader;const l=mg(t),c=gg(t),h=yg(t),d=vg(t),u=xg(t),p=t.isWebGL2?"":og(t),g=ag(t),y=lg(s),m=i.createProgram();let f,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Gi).join(`
`),f.length>0&&(f+=`
`),x=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Gi).join(`
`),x.length>0&&(x+=`
`)):(f=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gi).join(`
`),x=[p,Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kn?"#define TONE_MAPPING":"",t.toneMapping!==Kn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Kn?rg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,sg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gi).join(`
`)),r=Uo(r),r=Pl(r,t),r=Ll(r,t),a=Uo(a),a=Pl(a,t),a=Ll(a,t),r=Dl(r),a=Dl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Ja?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ja?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const _=v+f+r,C=v+x+a,A=Cl(i,i.VERTEX_SHADER,_),I=Cl(i,i.FRAGMENT_SHADER,C);i.attachShader(m,A),i.attachShader(m,I),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function L(z){if(o.debug.checkShaderErrors){const Y=i.getProgramInfoLog(m).trim(),P=i.getShaderInfoLog(A).trim(),F=i.getShaderInfoLog(I).trim();let G=!0,j=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(G=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,m,A,I);else{const W=Rl(i,A,"vertex"),X=Rl(i,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+Y+`
`+W+`
`+X)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(P===""||F==="")&&(j=!1);j&&(z.diagnostics={runnable:G,programLog:Y,vertexShader:{log:P,prefix:f},fragmentShader:{log:F,prefix:x}})}i.deleteShader(A),i.deleteShader(I),b=new ur(i,m),S=cg(i,m)}let b;this.getUniforms=function(){return b===void 0&&L(this),b};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=i.getProgramParameter(m,eg)),O},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tg++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=I,this}let bg=0;class Mg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Sg(e),t.set(e,n)),n}}class Sg{constructor(e){this.id=bg++,this.code=e,this.usedTimes=0}}function wg(o,e,t,n,i,s,r){const a=new Qo,l=new Mg,c=[],h=i.isWebGL2,d=i.logarithmicDepthBuffer,u=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return b===0?"uv":`uv${b}`}function m(b,S,O,z,Y){const P=z.fog,F=Y.geometry,G=b.isMeshStandardMaterial?z.environment:null,j=(b.isMeshStandardMaterial?t:e).get(b.envMap||G),W=j&&j.mapping===Er?j.image.height:null,X=g[b.type];b.precision!==null&&(p=i.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const $=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,te=$!==void 0?$.length:0;let ee=0;F.morphAttributes.position!==void 0&&(ee=1),F.morphAttributes.normal!==void 0&&(ee=2),F.morphAttributes.color!==void 0&&(ee=3);let V,q,oe,fe;if(X){const Ut=vn[X];V=Ut.vertexShader,q=Ut.fragmentShader}else V=b.vertexShader,q=b.fragmentShader,l.update(b),oe=l.getVertexShaderID(b),fe=l.getFragmentShaderID(b);const pe=o.getRenderTarget(),Ae=Y.isInstancedMesh===!0,De=Y.isBatchedMesh===!0,Se=!!b.map,qe=!!b.matcap,B=!!j,Bt=!!b.aoMap,xe=!!b.lightMap,Ce=!!b.bumpMap,me=!!b.normalMap,lt=!!b.displacementMap,Ue=!!b.emissiveMap,E=!!b.metalnessMap,M=!!b.roughnessMap,k=b.anisotropy>0,J=b.clearcoat>0,Z=b.iridescence>0,Q=b.sheen>0,ge=b.transmission>0,ae=k&&!!b.anisotropyMap,he=J&&!!b.clearcoatMap,Me=J&&!!b.clearcoatNormalMap,ke=J&&!!b.clearcoatRoughnessMap,K=Z&&!!b.iridescenceMap,Qe=Z&&!!b.iridescenceThicknessMap,Ve=Q&&!!b.sheenColorMap,Ie=Q&&!!b.sheenRoughnessMap,ve=!!b.specularMap,de=!!b.specularColorMap,Fe=!!b.specularIntensityMap,Je=ge&&!!b.transmissionMap,ut=ge&&!!b.thicknessMap,He=!!b.gradientMap,ne=!!b.alphaMap,R=b.alphaTest>0,se=!!b.alphaHash,re=!!b.extensions,we=!!F.attributes.uv1,_e=!!F.attributes.uv2,nt=!!F.attributes.uv3;let it=Kn;return b.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(it=o.toneMapping),{isWebGL2:h,shaderID:X,shaderType:b.type,shaderName:b.name,vertexShader:V,fragmentShader:q,defines:b.defines,customVertexShaderID:oe,customFragmentShaderID:fe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:De,instancing:Ae,instancingColor:Ae&&Y.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:pe===null?o.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:It,map:Se,matcap:qe,envMap:B,envMapMode:B&&j.mapping,envMapCubeUVHeight:W,aoMap:Bt,lightMap:xe,bumpMap:Ce,normalMap:me,displacementMap:u&&lt,emissiveMap:Ue,normalMapObjectSpace:me&&b.normalMapType===xd,normalMapTangentSpace:me&&b.normalMapType===Tr,metalnessMap:E,roughnessMap:M,anisotropy:k,anisotropyMap:ae,clearcoat:J,clearcoatMap:he,clearcoatNormalMap:Me,clearcoatRoughnessMap:ke,iridescence:Z,iridescenceMap:K,iridescenceThicknessMap:Qe,sheen:Q,sheenColorMap:Ve,sheenRoughnessMap:Ie,specularMap:ve,specularColorMap:de,specularIntensityMap:Fe,transmission:ge,transmissionMap:Je,thicknessMap:ut,gradientMap:He,opaque:b.transparent===!1&&b.blending===Wi,alphaMap:ne,alphaTest:R,alphaHash:se,combine:b.combine,mapUv:Se&&y(b.map.channel),aoMapUv:Bt&&y(b.aoMap.channel),lightMapUv:xe&&y(b.lightMap.channel),bumpMapUv:Ce&&y(b.bumpMap.channel),normalMapUv:me&&y(b.normalMap.channel),displacementMapUv:lt&&y(b.displacementMap.channel),emissiveMapUv:Ue&&y(b.emissiveMap.channel),metalnessMapUv:E&&y(b.metalnessMap.channel),roughnessMapUv:M&&y(b.roughnessMap.channel),anisotropyMapUv:ae&&y(b.anisotropyMap.channel),clearcoatMapUv:he&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:Me&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:Qe&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&y(b.sheenRoughnessMap.channel),specularMapUv:ve&&y(b.specularMap.channel),specularColorMapUv:de&&y(b.specularColorMap.channel),specularIntensityMapUv:Fe&&y(b.specularIntensityMap.channel),transmissionMapUv:Je&&y(b.transmissionMap.channel),thicknessMapUv:ut&&y(b.thicknessMap.channel),alphaMapUv:ne&&y(b.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(me||k),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:_e,vertexUv3s:nt,pointsUvs:Y.isPoints===!0&&!!F.attributes.uv&&(Se||ne),fog:!!P,useFog:b.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:Y.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ee,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:o.shadowMap.enabled&&O.length>0,shadowMapType:o.shadowMap.type,toneMapping:it,useLegacyLights:o._useLegacyLights,decodeVideoTexture:Se&&b.map.isVideoTexture===!0&&Ze.getTransfer(b.map.colorSpace)===ot,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===nn,flipSided:b.side===jt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:re&&b.extensions.derivatives===!0,extensionFragDepth:re&&b.extensions.fragDepth===!0,extensionDrawBuffers:re&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&b.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function f(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const O in b.defines)S.push(O),S.push(b.defines[O]);return b.isRawShaderMaterial===!1&&(x(S,b),v(S,b),S.push(o.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function x(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function v(b,S){a.disableAll(),S.isWebGL2&&a.enable(0),S.supportsVertexTextures&&a.enable(1),S.instancing&&a.enable(2),S.instancingColor&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.skinning&&a.enable(4),S.morphTargets&&a.enable(5),S.morphNormals&&a.enable(6),S.morphColors&&a.enable(7),S.premultipliedAlpha&&a.enable(8),S.shadowMapEnabled&&a.enable(9),S.useLegacyLights&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function _(b){const S=g[b.type];let O;if(S){const z=vn[S];O=ru.clone(z.uniforms)}else O=b.uniforms;return O}function C(b,S){let O;for(let z=0,Y=c.length;z<Y;z++){const P=c[z];if(P.cacheKey===S){O=P,++O.usedTimes;break}}return O===void 0&&(O=new _g(o,S,b,s),c.push(O)),O}function A(b){if(--b.usedTimes===0){const S=c.indexOf(b);c[S]=c[c.length-1],c.pop(),b.destroy()}}function I(b){l.remove(b)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:_,acquireProgram:C,releaseProgram:A,releaseShaderCache:I,programs:c,dispose:L}}function Eg(){let o=new WeakMap;function e(s){let r=o.get(s);return r===void 0&&(r={},o.set(s,r)),r}function t(s){o.delete(s)}function n(s,r,a){o.get(s)[r]=a}function i(){o=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Tg(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Bl(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function Ul(){const o=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function r(d,u,p,g,y,m){let f=o[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:y,group:m},o[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=y,f.group=m),e++,f}function a(d,u,p,g,y,m){const f=r(d,u,p,g,y,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function l(d,u,p,g,y,m){const f=r(d,u,p,g,y,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function c(d,u){t.length>1&&t.sort(d||Tg),n.length>1&&n.sort(u||Bl),i.length>1&&i.sort(u||Bl)}function h(){for(let d=e,u=o.length;d<u;d++){const p=o[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function Ag(){let o=new WeakMap;function e(n,i){const s=o.get(n);let r;return s===void 0?(r=new Ul,o.set(n,[r])):i>=s.length?(r=new Ul,s.push(r)):r=s[i],r}function t(){o=new WeakMap}return{get:e,dispose:t}}function Ig(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new ce};break;case"SpotLight":t={position:new T,direction:new T,color:new ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new ce,groundColor:new ce};break;case"RectAreaLight":t={color:new ce,position:new T,halfWidth:new T,halfHeight:new T};break}return o[e.id]=t,t}}}function Cg(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=t,t}}}let Rg=0;function Pg(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function Lg(o,e){const t=new Ig,n=Cg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new T);const s=new T,r=new ue,a=new ue;function l(h,d){let u=0,p=0,g=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let y=0,m=0,f=0,x=0,v=0,_=0,C=0,A=0,I=0,L=0,b=0;h.sort(Pg);const S=d===!0?Math.PI:1;for(let z=0,Y=h.length;z<Y;z++){const P=h[z],F=P.color,G=P.intensity,j=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=F.r*G*S,p+=F.g*G*S,g+=F.b*G*S;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],G);b++}else if(P.isDirectionalLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity*S),P.castShadow){const $=P.shadow,te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.directionalShadow[y]=te,i.directionalShadowMap[y]=W,i.directionalShadowMatrix[y]=P.shadow.matrix,_++}i.directional[y]=X,y++}else if(P.isSpotLight){const X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(F).multiplyScalar(G*S),X.distance=j,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[f]=X;const $=P.shadow;if(P.map&&(i.spotLightMap[I]=P.map,I++,$.updateMatrices(P),P.castShadow&&L++),i.spotLightMatrix[f]=$.matrix,P.castShadow){const te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.spotShadow[f]=te,i.spotShadowMap[f]=W,A++}f++}else if(P.isRectAreaLight){const X=t.get(P);X.color.copy(F).multiplyScalar(G),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[x]=X,x++}else if(P.isPointLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity*S),X.distance=P.distance,X.decay=P.decay,P.castShadow){const $=P.shadow,te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,te.shadowCameraNear=$.camera.near,te.shadowCameraFar=$.camera.far,i.pointShadow[m]=te,i.pointShadowMap[m]=W,i.pointShadowMatrix[m]=P.shadow.matrix,C++}i.point[m]=X,m++}else if(P.isHemisphereLight){const X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(G*S),X.groundColor.copy(P.groundColor).multiplyScalar(G*S),i.hemi[v]=X,v++}}x>0&&(e.isWebGL2?o.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2):(i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2):o.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2):o.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=p,i.ambient[2]=g;const O=i.hash;(O.directionalLength!==y||O.pointLength!==m||O.spotLength!==f||O.rectAreaLength!==x||O.hemiLength!==v||O.numDirectionalShadows!==_||O.numPointShadows!==C||O.numSpotShadows!==A||O.numSpotMaps!==I||O.numLightProbes!==b)&&(i.directional.length=y,i.spot.length=f,i.rectArea.length=x,i.point.length=m,i.hemi.length=v,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=A+I-L,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=b,O.directionalLength=y,O.pointLength=m,O.spotLength=f,O.rectAreaLength=x,O.hemiLength=v,O.numDirectionalShadows=_,O.numPointShadows=C,O.numSpotShadows=A,O.numSpotMaps=I,O.numLightProbes=b,i.version=Rg++)}function c(h,d){let u=0,p=0,g=0,y=0,m=0;const f=d.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const _=h[x];if(_.isDirectionalLight){const C=i.directional[u];C.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(f),u++}else if(_.isSpotLight){const C=i.spot[g];C.position.setFromMatrixPosition(_.matrixWorld),C.position.applyMatrix4(f),C.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(f),g++}else if(_.isRectAreaLight){const C=i.rectArea[y];C.position.setFromMatrixPosition(_.matrixWorld),C.position.applyMatrix4(f),a.identity(),r.copy(_.matrixWorld),r.premultiply(f),a.extractRotation(r),C.halfWidth.set(_.width*.5,0,0),C.halfHeight.set(0,_.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){const C=i.point[p];C.position.setFromMatrixPosition(_.matrixWorld),C.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){const C=i.hemi[m];C.direction.setFromMatrixPosition(_.matrixWorld),C.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:i}}function kl(o,e){const t=new Lg(o,e),n=[],i=[];function s(){n.length=0,i.length=0}function r(d){n.push(d)}function a(d){i.push(d)}function l(d){t.setup(n,d)}function c(d){t.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:r,pushShadow:a}}function Dg(o,e){let t=new WeakMap;function n(s,r=0){const a=t.get(s);let l;return a===void 0?(l=new kl(o,e),t.set(s,[l])):r>=a.length?(l=new kl(o,e),a.push(l)):l=a[r],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class Fg extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Bg extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ug=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ng(o,e,t){let n=new ta;const i=new Ee,s=new Ee,r=new Ye,a=new Fg({depthPacking:vd}),l=new Bg,c={},h=t.maxTextureSize,d={[Dn]:jt,[jt]:Dn,[nn]:nn},u=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:Ug,fragmentShader:kg}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new mt;g.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Le(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_c;let f=this.type;this.render=function(A,I,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const b=o.getRenderTarget(),S=o.getActiveCubeFace(),O=o.getActiveMipmapLevel(),z=o.state;z.setBlending(Yn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const Y=f!==In&&this.type===In,P=f===In&&this.type!==In;for(let F=0,G=A.length;F<G;F++){const j=A[F],W=j.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const X=W.getFrameExtents();if(i.multiply(X),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/X.x),i.x=s.x*X.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/X.y),i.y=s.y*X.y,W.mapSize.y=s.y)),W.map===null||Y===!0||P===!0){const te=this.type!==In?{minFilter:Tt,magFilter:Tt}:{};W.map!==null&&W.map.dispose(),W.map=new fi(i.x,i.y,te),W.map.texture.name=j.name+".shadowMap",W.camera.updateProjectionMatrix()}o.setRenderTarget(W.map),o.clear();const $=W.getViewportCount();for(let te=0;te<$;te++){const ee=W.getViewport(te);r.set(s.x*ee.x,s.y*ee.y,s.x*ee.z,s.y*ee.w),z.viewport(r),W.updateMatrices(j,te),n=W.getFrustum(),_(I,L,W.camera,j,this.type)}W.isPointLightShadow!==!0&&this.type===In&&x(W,L),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,o.setRenderTarget(b,S,O)};function x(A,I){const L=e.update(y);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new fi(i.x,i.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,o.setRenderTarget(A.mapPass),o.clear(),o.renderBufferDirect(I,null,L,u,y,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,o.setRenderTarget(A.map),o.clear(),o.renderBufferDirect(I,null,L,p,y,null)}function v(A,I,L,b){let S=null;const O=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(O!==void 0)S=O;else if(S=L.isPointLight===!0?l:a,o.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const z=S.uuid,Y=I.uuid;let P=c[z];P===void 0&&(P={},c[z]=P);let F=P[Y];F===void 0&&(F=S.clone(),P[Y]=F,I.addEventListener("dispose",C)),S=F}if(S.visible=I.visible,S.wireframe=I.wireframe,b===In?S.side=I.shadowSide!==null?I.shadowSide:I.side:S.side=I.shadowSide!==null?I.shadowSide:d[I.side],S.alphaMap=I.alphaMap,S.alphaTest=I.alphaTest,S.map=I.map,S.clipShadows=I.clipShadows,S.clippingPlanes=I.clippingPlanes,S.clipIntersection=I.clipIntersection,S.displacementMap=I.displacementMap,S.displacementScale=I.displacementScale,S.displacementBias=I.displacementBias,S.wireframeLinewidth=I.wireframeLinewidth,S.linewidth=I.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const z=o.properties.get(S);z.light=L}return S}function _(A,I,L,b,S){if(A.visible===!1)return;if(A.layers.test(I.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===In)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const Y=e.update(A),P=A.material;if(Array.isArray(P)){const F=Y.groups;for(let G=0,j=F.length;G<j;G++){const W=F[G],X=P[W.materialIndex];if(X&&X.visible){const $=v(A,X,b,S);A.onBeforeShadow(o,A,I,L,Y,$,W),o.renderBufferDirect(L,null,Y,$,A,W),A.onAfterShadow(o,A,I,L,Y,$,W)}}}else if(P.visible){const F=v(A,P,b,S);A.onBeforeShadow(o,A,I,L,Y,F,null),o.renderBufferDirect(L,null,Y,F,A,null),A.onAfterShadow(o,A,I,L,Y,F,null)}}const z=A.children;for(let Y=0,P=z.length;Y<P;Y++)_(z[Y],I,L,b,S)}function C(A){A.target.removeEventListener("dispose",C);for(const L in c){const b=c[L],S=A.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}function Og(o,e,t){const n=t.isWebGL2;function i(){let R=!1;const se=new Ye;let re=null;const we=new Ye(0,0,0,0);return{setMask:function(_e){re!==_e&&!R&&(o.colorMask(_e,_e,_e,_e),re=_e)},setLocked:function(_e){R=_e},setClear:function(_e,nt,it,St,Ut){Ut===!0&&(_e*=St,nt*=St,it*=St),se.set(_e,nt,it,St),we.equals(se)===!1&&(o.clearColor(_e,nt,it,St),we.copy(se))},reset:function(){R=!1,re=null,we.set(-1,0,0,0)}}}function s(){let R=!1,se=null,re=null,we=null;return{setTest:function(_e){_e?De(o.DEPTH_TEST):Se(o.DEPTH_TEST)},setMask:function(_e){se!==_e&&!R&&(o.depthMask(_e),se=_e)},setFunc:function(_e){if(re!==_e){switch(_e){case $h:o.depthFunc(o.NEVER);break;case Xh:o.depthFunc(o.ALWAYS);break;case jh:o.depthFunc(o.LESS);break;case pr:o.depthFunc(o.LEQUAL);break;case qh:o.depthFunc(o.EQUAL);break;case Yh:o.depthFunc(o.GEQUAL);break;case Kh:o.depthFunc(o.GREATER);break;case Zh:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}re=_e}},setLocked:function(_e){R=_e},setClear:function(_e){we!==_e&&(o.clearDepth(_e),we=_e)},reset:function(){R=!1,se=null,re=null,we=null}}}function r(){let R=!1,se=null,re=null,we=null,_e=null,nt=null,it=null,St=null,Ut=null;return{setTest:function(st){R||(st?De(o.STENCIL_TEST):Se(o.STENCIL_TEST))},setMask:function(st){se!==st&&!R&&(o.stencilMask(st),se=st)},setFunc:function(st,kt,yn){(re!==st||we!==kt||_e!==yn)&&(o.stencilFunc(st,kt,yn),re=st,we=kt,_e=yn)},setOp:function(st,kt,yn){(nt!==st||it!==kt||St!==yn)&&(o.stencilOp(st,kt,yn),nt=st,it=kt,St=yn)},setLocked:function(st){R=st},setClear:function(st){Ut!==st&&(o.clearStencil(st),Ut=st)},reset:function(){R=!1,se=null,re=null,we=null,_e=null,nt=null,it=null,St=null,Ut=null}}}const a=new i,l=new s,c=new r,h=new WeakMap,d=new WeakMap;let u={},p={},g=new WeakMap,y=[],m=null,f=!1,x=null,v=null,_=null,C=null,A=null,I=null,L=null,b=new ce(0,0,0),S=0,O=!1,z=null,Y=null,P=null,F=null,G=null;const j=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,X=0;const $=o.getParameter(o.VERSION);$.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec($)[1]),W=X>=1):$.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),W=X>=2);let te=null,ee={};const V=o.getParameter(o.SCISSOR_BOX),q=o.getParameter(o.VIEWPORT),oe=new Ye().fromArray(V),fe=new Ye().fromArray(q);function pe(R,se,re,we){const _e=new Uint8Array(4),nt=o.createTexture();o.bindTexture(R,nt),o.texParameteri(R,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(R,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let it=0;it<re;it++)n&&(R===o.TEXTURE_3D||R===o.TEXTURE_2D_ARRAY)?o.texImage3D(se,0,o.RGBA,1,1,we,0,o.RGBA,o.UNSIGNED_BYTE,_e):o.texImage2D(se+it,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,_e);return nt}const Ae={};Ae[o.TEXTURE_2D]=pe(o.TEXTURE_2D,o.TEXTURE_2D,1),Ae[o.TEXTURE_CUBE_MAP]=pe(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ae[o.TEXTURE_2D_ARRAY]=pe(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),Ae[o.TEXTURE_3D]=pe(o.TEXTURE_3D,o.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),De(o.DEPTH_TEST),l.setFunc(pr),Ue(!1),E(xa),De(o.CULL_FACE),me(Yn);function De(R){u[R]!==!0&&(o.enable(R),u[R]=!0)}function Se(R){u[R]!==!1&&(o.disable(R),u[R]=!1)}function qe(R,se){return p[R]!==se?(o.bindFramebuffer(R,se),p[R]=se,n&&(R===o.DRAW_FRAMEBUFFER&&(p[o.FRAMEBUFFER]=se),R===o.FRAMEBUFFER&&(p[o.DRAW_FRAMEBUFFER]=se)),!0):!1}function B(R,se){let re=y,we=!1;if(R)if(re=g.get(se),re===void 0&&(re=[],g.set(se,re)),R.isWebGLMultipleRenderTargets){const _e=R.texture;if(re.length!==_e.length||re[0]!==o.COLOR_ATTACHMENT0){for(let nt=0,it=_e.length;nt<it;nt++)re[nt]=o.COLOR_ATTACHMENT0+nt;re.length=_e.length,we=!0}}else re[0]!==o.COLOR_ATTACHMENT0&&(re[0]=o.COLOR_ATTACHMENT0,we=!0);else re[0]!==o.BACK&&(re[0]=o.BACK,we=!0);we&&(t.isWebGL2?o.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function Bt(R){return m!==R?(o.useProgram(R),m=R,!0):!1}const xe={[ai]:o.FUNC_ADD,[Rh]:o.FUNC_SUBTRACT,[Ph]:o.FUNC_REVERSE_SUBTRACT};if(n)xe[Sa]=o.MIN,xe[wa]=o.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(xe[Sa]=R.MIN_EXT,xe[wa]=R.MAX_EXT)}const Ce={[Lh]:o.ZERO,[Dh]:o.ONE,[Fh]:o.SRC_COLOR,[Ao]:o.SRC_ALPHA,[zh]:o.SRC_ALPHA_SATURATE,[Nh]:o.DST_COLOR,[Uh]:o.DST_ALPHA,[Bh]:o.ONE_MINUS_SRC_COLOR,[Io]:o.ONE_MINUS_SRC_ALPHA,[Oh]:o.ONE_MINUS_DST_COLOR,[kh]:o.ONE_MINUS_DST_ALPHA,[Hh]:o.CONSTANT_COLOR,[Gh]:o.ONE_MINUS_CONSTANT_COLOR,[Vh]:o.CONSTANT_ALPHA,[Wh]:o.ONE_MINUS_CONSTANT_ALPHA};function me(R,se,re,we,_e,nt,it,St,Ut,st){if(R===Yn){f===!0&&(Se(o.BLEND),f=!1);return}if(f===!1&&(De(o.BLEND),f=!0),R!==Ch){if(R!==x||st!==O){if((v!==ai||A!==ai)&&(o.blendEquation(o.FUNC_ADD),v=ai,A=ai),st)switch(R){case Wi:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case _a:o.blendFunc(o.ONE,o.ONE);break;case ba:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Ma:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Wi:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case _a:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case ba:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Ma:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}_=null,C=null,I=null,L=null,b.set(0,0,0),S=0,x=R,O=st}return}_e=_e||se,nt=nt||re,it=it||we,(se!==v||_e!==A)&&(o.blendEquationSeparate(xe[se],xe[_e]),v=se,A=_e),(re!==_||we!==C||nt!==I||it!==L)&&(o.blendFuncSeparate(Ce[re],Ce[we],Ce[nt],Ce[it]),_=re,C=we,I=nt,L=it),(St.equals(b)===!1||Ut!==S)&&(o.blendColor(St.r,St.g,St.b,Ut),b.copy(St),S=Ut),x=R,O=!1}function lt(R,se){R.side===nn?Se(o.CULL_FACE):De(o.CULL_FACE);let re=R.side===jt;se&&(re=!re),Ue(re),R.blending===Wi&&R.transparent===!1?me(Yn):me(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),l.setFunc(R.depthFunc),l.setTest(R.depthTest),l.setMask(R.depthWrite),a.setMask(R.colorWrite);const we=R.stencilWrite;c.setTest(we),we&&(c.setMask(R.stencilWriteMask),c.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),c.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),k(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?De(o.SAMPLE_ALPHA_TO_COVERAGE):Se(o.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(R){z!==R&&(R?o.frontFace(o.CW):o.frontFace(o.CCW),z=R)}function E(R){R!==Ah?(De(o.CULL_FACE),R!==Y&&(R===xa?o.cullFace(o.BACK):R===Ih?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Se(o.CULL_FACE),Y=R}function M(R){R!==P&&(W&&o.lineWidth(R),P=R)}function k(R,se,re){R?(De(o.POLYGON_OFFSET_FILL),(F!==se||G!==re)&&(o.polygonOffset(se,re),F=se,G=re)):Se(o.POLYGON_OFFSET_FILL)}function J(R){R?De(o.SCISSOR_TEST):Se(o.SCISSOR_TEST)}function Z(R){R===void 0&&(R=o.TEXTURE0+j-1),te!==R&&(o.activeTexture(R),te=R)}function Q(R,se,re){re===void 0&&(te===null?re=o.TEXTURE0+j-1:re=te);let we=ee[re];we===void 0&&(we={type:void 0,texture:void 0},ee[re]=we),(we.type!==R||we.texture!==se)&&(te!==re&&(o.activeTexture(re),te=re),o.bindTexture(R,se||Ae[R]),we.type=R,we.texture=se)}function ge(){const R=ee[te];R!==void 0&&R.type!==void 0&&(o.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ae(){try{o.compressedTexImage2D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(){try{o.compressedTexImage3D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Me(){try{o.texSubImage2D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ke(){try{o.texSubImage3D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function K(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Qe(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ve(){try{o.texStorage2D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ie(){try{o.texStorage3D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ve(){try{o.texImage2D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function de(){try{o.texImage3D.apply(o,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Fe(R){oe.equals(R)===!1&&(o.scissor(R.x,R.y,R.z,R.w),oe.copy(R))}function Je(R){fe.equals(R)===!1&&(o.viewport(R.x,R.y,R.z,R.w),fe.copy(R))}function ut(R,se){let re=d.get(se);re===void 0&&(re=new WeakMap,d.set(se,re));let we=re.get(R);we===void 0&&(we=o.getUniformBlockIndex(se,R.name),re.set(R,we))}function He(R,se){const we=d.get(se).get(R);h.get(se)!==we&&(o.uniformBlockBinding(se,we,R.__bindingPointIndex),h.set(se,we))}function ne(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),n===!0&&(o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null)),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),u={},te=null,ee={},p={},g=new WeakMap,y=[],m=null,f=!1,x=null,v=null,_=null,C=null,A=null,I=null,L=null,b=new ce(0,0,0),S=0,O=!1,z=null,Y=null,P=null,F=null,G=null,oe.set(0,0,o.canvas.width,o.canvas.height),fe.set(0,0,o.canvas.width,o.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:De,disable:Se,bindFramebuffer:qe,drawBuffers:B,useProgram:Bt,setBlending:me,setMaterial:lt,setFlipSided:Ue,setCullFace:E,setLineWidth:M,setPolygonOffset:k,setScissorTest:J,activeTexture:Z,bindTexture:Q,unbindTexture:ge,compressedTexImage2D:ae,compressedTexImage3D:he,texImage2D:ve,texImage3D:de,updateUBOMapping:ut,uniformBlockBinding:He,texStorage2D:Ve,texStorage3D:Ie,texSubImage2D:Me,texSubImage3D:ke,compressedTexSubImage2D:K,compressedTexSubImage3D:Qe,scissor:Fe,viewport:Je,reset:ne}}function zg(o,e,t,n,i,s,r){const a=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,M){return p?new OffscreenCanvas(E,M):_s("canvas")}function y(E,M,k,J){let Z=1;if((E.width>J||E.height>J)&&(Z=J/Math.max(E.width,E.height)),Z<1||M===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const Q=M?br:Math.floor,ge=Q(Z*E.width),ae=Q(Z*E.height);d===void 0&&(d=g(ge,ae));const he=k?g(ge,ae):d;return he.width=ge,he.height=ae,he.getContext("2d").drawImage(E,0,0,ge,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+ge+"x"+ae+")."),he}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return Bo(E.width)&&Bo(E.height)}function f(E){return a?!1:E.wrapS!==$t||E.wrapT!==$t||E.minFilter!==Tt&&E.minFilter!==Vt}function x(E,M){return E.generateMipmaps&&M&&E.minFilter!==Tt&&E.minFilter!==Vt}function v(E){o.generateMipmap(E)}function _(E,M,k,J,Z=!1){if(a===!1)return M;if(E!==null){if(o[E]!==void 0)return o[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Q=M;if(M===o.RED&&(k===o.FLOAT&&(Q=o.R32F),k===o.HALF_FLOAT&&(Q=o.R16F),k===o.UNSIGNED_BYTE&&(Q=o.R8)),M===o.RED_INTEGER&&(k===o.UNSIGNED_BYTE&&(Q=o.R8UI),k===o.UNSIGNED_SHORT&&(Q=o.R16UI),k===o.UNSIGNED_INT&&(Q=o.R32UI),k===o.BYTE&&(Q=o.R8I),k===o.SHORT&&(Q=o.R16I),k===o.INT&&(Q=o.R32I)),M===o.RG&&(k===o.FLOAT&&(Q=o.RG32F),k===o.HALF_FLOAT&&(Q=o.RG16F),k===o.UNSIGNED_BYTE&&(Q=o.RG8)),M===o.RGBA){const ge=Z?yr:Ze.getTransfer(J);k===o.FLOAT&&(Q=o.RGBA32F),k===o.HALF_FLOAT&&(Q=o.RGBA16F),k===o.UNSIGNED_BYTE&&(Q=ge===ot?o.SRGB8_ALPHA8:o.RGBA8),k===o.UNSIGNED_SHORT_4_4_4_4&&(Q=o.RGBA4),k===o.UNSIGNED_SHORT_5_5_5_1&&(Q=o.RGB5_A1)}return(Q===o.R16F||Q===o.R32F||Q===o.RG16F||Q===o.RG32F||Q===o.RGBA16F||Q===o.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function C(E,M,k){return x(E,k)===!0||E.isFramebufferTexture&&E.minFilter!==Tt&&E.minFilter!==Vt?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function A(E){return E===Tt||E===Ro||E===dr?o.NEAREST:o.LINEAR}function I(E){const M=E.target;M.removeEventListener("dispose",I),b(M),M.isVideoTexture&&h.delete(M)}function L(E){const M=E.target;M.removeEventListener("dispose",L),O(M)}function b(E){const M=n.get(E);if(M.__webglInit===void 0)return;const k=E.source,J=u.get(k);if(J){const Z=J[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&S(E),Object.keys(J).length===0&&u.delete(k)}n.remove(E)}function S(E){const M=n.get(E);o.deleteTexture(M.__webglTexture);const k=E.source,J=u.get(k);delete J[M.__cacheKey],r.memory.textures--}function O(E){const M=E.texture,k=n.get(E),J=n.get(M);if(J.__webglTexture!==void 0&&(o.deleteTexture(J.__webglTexture),r.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(k.__webglFramebuffer[Z]))for(let Q=0;Q<k.__webglFramebuffer[Z].length;Q++)o.deleteFramebuffer(k.__webglFramebuffer[Z][Q]);else o.deleteFramebuffer(k.__webglFramebuffer[Z]);k.__webglDepthbuffer&&o.deleteRenderbuffer(k.__webglDepthbuffer[Z])}else{if(Array.isArray(k.__webglFramebuffer))for(let Z=0;Z<k.__webglFramebuffer.length;Z++)o.deleteFramebuffer(k.__webglFramebuffer[Z]);else o.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&o.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&o.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let Z=0;Z<k.__webglColorRenderbuffer.length;Z++)k.__webglColorRenderbuffer[Z]&&o.deleteRenderbuffer(k.__webglColorRenderbuffer[Z]);k.__webglDepthRenderbuffer&&o.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let Z=0,Q=M.length;Z<Q;Z++){const ge=n.get(M[Z]);ge.__webglTexture&&(o.deleteTexture(ge.__webglTexture),r.memory.textures--),n.remove(M[Z])}n.remove(M),n.remove(E)}let z=0;function Y(){z=0}function P(){const E=z;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),z+=1,E}function F(E){const M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function G(E,M){const k=n.get(E);if(E.isVideoTexture&&lt(E),E.isRenderTargetTexture===!1&&E.version>0&&k.__version!==E.version){const J=E.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(k,E,M);return}}t.bindTexture(o.TEXTURE_2D,k.__webglTexture,o.TEXTURE0+M)}function j(E,M){const k=n.get(E);if(E.version>0&&k.__version!==E.version){oe(k,E,M);return}t.bindTexture(o.TEXTURE_2D_ARRAY,k.__webglTexture,o.TEXTURE0+M)}function W(E,M){const k=n.get(E);if(E.version>0&&k.__version!==E.version){oe(k,E,M);return}t.bindTexture(o.TEXTURE_3D,k.__webglTexture,o.TEXTURE0+M)}function X(E,M){const k=n.get(E);if(E.version>0&&k.__version!==E.version){fe(k,E,M);return}t.bindTexture(o.TEXTURE_CUBE_MAP,k.__webglTexture,o.TEXTURE0+M)}const $={[Jn]:o.REPEAT,[$t]:o.CLAMP_TO_EDGE,[mr]:o.MIRRORED_REPEAT},te={[Tt]:o.NEAREST,[Ro]:o.NEAREST_MIPMAP_NEAREST,[dr]:o.NEAREST_MIPMAP_LINEAR,[Vt]:o.LINEAR,[Sc]:o.LINEAR_MIPMAP_NEAREST,[pi]:o.LINEAR_MIPMAP_LINEAR},ee={[_d]:o.NEVER,[Td]:o.ALWAYS,[bd]:o.LESS,[Fc]:o.LEQUAL,[Md]:o.EQUAL,[Ed]:o.GEQUAL,[Sd]:o.GREATER,[wd]:o.NOTEQUAL};function V(E,M,k){if(k?(o.texParameteri(E,o.TEXTURE_WRAP_S,$[M.wrapS]),o.texParameteri(E,o.TEXTURE_WRAP_T,$[M.wrapT]),(E===o.TEXTURE_3D||E===o.TEXTURE_2D_ARRAY)&&o.texParameteri(E,o.TEXTURE_WRAP_R,$[M.wrapR]),o.texParameteri(E,o.TEXTURE_MAG_FILTER,te[M.magFilter]),o.texParameteri(E,o.TEXTURE_MIN_FILTER,te[M.minFilter])):(o.texParameteri(E,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(E,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),(E===o.TEXTURE_3D||E===o.TEXTURE_2D_ARRAY)&&o.texParameteri(E,o.TEXTURE_WRAP_R,o.CLAMP_TO_EDGE),(M.wrapS!==$t||M.wrapT!==$t)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),o.texParameteri(E,o.TEXTURE_MAG_FILTER,A(M.magFilter)),o.texParameteri(E,o.TEXTURE_MIN_FILTER,A(M.minFilter)),M.minFilter!==Tt&&M.minFilter!==Vt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(o.texParameteri(E,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(E,o.TEXTURE_COMPARE_FUNC,ee[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===Tt||M.minFilter!==dr&&M.minFilter!==pi||M.type===Rn&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===vs&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(o.texParameterf(E,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function q(E,M){let k=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",I));const J=M.source;let Z=u.get(J);Z===void 0&&(Z={},u.set(J,Z));const Q=F(M);if(Q!==E.__cacheKey){Z[Q]===void 0&&(Z[Q]={texture:o.createTexture(),usedTimes:0},r.memory.textures++,k=!0),Z[Q].usedTimes++;const ge=Z[E.__cacheKey];ge!==void 0&&(Z[E.__cacheKey].usedTimes--,ge.usedTimes===0&&S(M)),E.__cacheKey=Q,E.__webglTexture=Z[Q].texture}return k}function oe(E,M,k){let J=o.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=o.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=o.TEXTURE_3D);const Z=q(E,M),Q=M.source;t.bindTexture(J,E.__webglTexture,o.TEXTURE0+k);const ge=n.get(Q);if(Q.version!==ge.__version||Z===!0){t.activeTexture(o.TEXTURE0+k);const ae=Ze.getPrimaries(Ze.workingColorSpace),he=M.colorSpace===rn?null:Ze.getPrimaries(M.colorSpace),Me=M.colorSpace===rn||ae===he?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,M.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,M.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const ke=f(M)&&m(M.image)===!1;let K=y(M.image,ke,!1,i.maxTextureSize);K=Ue(M,K);const Qe=m(K)||a,Ve=s.convert(M.format,M.colorSpace);let Ie=s.convert(M.type),ve=_(M.internalFormat,Ve,Ie,M.colorSpace,M.isVideoTexture);V(J,M,Qe);let de;const Fe=M.mipmaps,Je=a&&M.isVideoTexture!==!0&&ve!==Rc,ut=ge.__version===void 0||Z===!0,He=C(M,K,Qe);if(M.isDepthTexture)ve=o.DEPTH_COMPONENT,a?M.type===Rn?ve=o.DEPTH_COMPONENT32F:M.type===Xn?ve=o.DEPTH_COMPONENT24:M.type===ci?ve=o.DEPTH24_STENCIL8:ve=o.DEPTH_COMPONENT16:M.type===Rn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===hi&&ve===o.DEPTH_COMPONENT&&M.type!==Yo&&M.type!==Xn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=Xn,Ie=s.convert(M.type)),M.format===Ki&&ve===o.DEPTH_COMPONENT&&(ve=o.DEPTH_STENCIL,M.type!==ci&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=ci,Ie=s.convert(M.type))),ut&&(Je?t.texStorage2D(o.TEXTURE_2D,1,ve,K.width,K.height):t.texImage2D(o.TEXTURE_2D,0,ve,K.width,K.height,0,Ve,Ie,null));else if(M.isDataTexture)if(Fe.length>0&&Qe){Je&&ut&&t.texStorage2D(o.TEXTURE_2D,He,ve,Fe[0].width,Fe[0].height);for(let ne=0,R=Fe.length;ne<R;ne++)de=Fe[ne],Je?t.texSubImage2D(o.TEXTURE_2D,ne,0,0,de.width,de.height,Ve,Ie,de.data):t.texImage2D(o.TEXTURE_2D,ne,ve,de.width,de.height,0,Ve,Ie,de.data);M.generateMipmaps=!1}else Je?(ut&&t.texStorage2D(o.TEXTURE_2D,He,ve,K.width,K.height),t.texSubImage2D(o.TEXTURE_2D,0,0,0,K.width,K.height,Ve,Ie,K.data)):t.texImage2D(o.TEXTURE_2D,0,ve,K.width,K.height,0,Ve,Ie,K.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Je&&ut&&t.texStorage3D(o.TEXTURE_2D_ARRAY,He,ve,Fe[0].width,Fe[0].height,K.depth);for(let ne=0,R=Fe.length;ne<R;ne++)de=Fe[ne],M.format!==sn?Ve!==null?Je?t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,K.depth,Ve,de.data,0,0):t.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ne,ve,de.width,de.height,K.depth,0,de.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?t.texSubImage3D(o.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,K.depth,Ve,Ie,de.data):t.texImage3D(o.TEXTURE_2D_ARRAY,ne,ve,de.width,de.height,K.depth,0,Ve,Ie,de.data)}else{Je&&ut&&t.texStorage2D(o.TEXTURE_2D,He,ve,Fe[0].width,Fe[0].height);for(let ne=0,R=Fe.length;ne<R;ne++)de=Fe[ne],M.format!==sn?Ve!==null?Je?t.compressedTexSubImage2D(o.TEXTURE_2D,ne,0,0,de.width,de.height,Ve,de.data):t.compressedTexImage2D(o.TEXTURE_2D,ne,ve,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?t.texSubImage2D(o.TEXTURE_2D,ne,0,0,de.width,de.height,Ve,Ie,de.data):t.texImage2D(o.TEXTURE_2D,ne,ve,de.width,de.height,0,Ve,Ie,de.data)}else if(M.isDataArrayTexture)Je?(ut&&t.texStorage3D(o.TEXTURE_2D_ARRAY,He,ve,K.width,K.height,K.depth),t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,Ve,Ie,K.data)):t.texImage3D(o.TEXTURE_2D_ARRAY,0,ve,K.width,K.height,K.depth,0,Ve,Ie,K.data);else if(M.isData3DTexture)Je?(ut&&t.texStorage3D(o.TEXTURE_3D,He,ve,K.width,K.height,K.depth),t.texSubImage3D(o.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,Ve,Ie,K.data)):t.texImage3D(o.TEXTURE_3D,0,ve,K.width,K.height,K.depth,0,Ve,Ie,K.data);else if(M.isFramebufferTexture){if(ut)if(Je)t.texStorage2D(o.TEXTURE_2D,He,ve,K.width,K.height);else{let ne=K.width,R=K.height;for(let se=0;se<He;se++)t.texImage2D(o.TEXTURE_2D,se,ve,ne,R,0,Ve,Ie,null),ne>>=1,R>>=1}}else if(Fe.length>0&&Qe){Je&&ut&&t.texStorage2D(o.TEXTURE_2D,He,ve,Fe[0].width,Fe[0].height);for(let ne=0,R=Fe.length;ne<R;ne++)de=Fe[ne],Je?t.texSubImage2D(o.TEXTURE_2D,ne,0,0,Ve,Ie,de):t.texImage2D(o.TEXTURE_2D,ne,ve,Ve,Ie,de);M.generateMipmaps=!1}else Je?(ut&&t.texStorage2D(o.TEXTURE_2D,He,ve,K.width,K.height),t.texSubImage2D(o.TEXTURE_2D,0,0,0,Ve,Ie,K)):t.texImage2D(o.TEXTURE_2D,0,ve,Ve,Ie,K);x(M,Qe)&&v(J),ge.__version=Q.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function fe(E,M,k){if(M.image.length!==6)return;const J=q(E,M),Z=M.source;t.bindTexture(o.TEXTURE_CUBE_MAP,E.__webglTexture,o.TEXTURE0+k);const Q=n.get(Z);if(Z.version!==Q.__version||J===!0){t.activeTexture(o.TEXTURE0+k);const ge=Ze.getPrimaries(Ze.workingColorSpace),ae=M.colorSpace===rn?null:Ze.getPrimaries(M.colorSpace),he=M.colorSpace===rn||ge===ae?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,M.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,M.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Me=M.isCompressedTexture||M.image[0].isCompressedTexture,ke=M.image[0]&&M.image[0].isDataTexture,K=[];for(let ne=0;ne<6;ne++)!Me&&!ke?K[ne]=y(M.image[ne],!1,!0,i.maxCubemapSize):K[ne]=ke?M.image[ne].image:M.image[ne],K[ne]=Ue(M,K[ne]);const Qe=K[0],Ve=m(Qe)||a,Ie=s.convert(M.format,M.colorSpace),ve=s.convert(M.type),de=_(M.internalFormat,Ie,ve,M.colorSpace),Fe=a&&M.isVideoTexture!==!0,Je=Q.__version===void 0||J===!0;let ut=C(M,Qe,Ve);V(o.TEXTURE_CUBE_MAP,M,Ve);let He;if(Me){Fe&&Je&&t.texStorage2D(o.TEXTURE_CUBE_MAP,ut,de,Qe.width,Qe.height);for(let ne=0;ne<6;ne++){He=K[ne].mipmaps;for(let R=0;R<He.length;R++){const se=He[R];M.format!==sn?Ie!==null?Fe?t.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,0,0,se.width,se.height,Ie,se.data):t.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,de,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,0,0,se.width,se.height,Ie,ve,se.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,de,se.width,se.height,0,Ie,ve,se.data)}}}else{He=M.mipmaps,Fe&&Je&&(He.length>0&&ut++,t.texStorage2D(o.TEXTURE_CUBE_MAP,ut,de,K[0].width,K[0].height));for(let ne=0;ne<6;ne++)if(ke){Fe?t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,K[ne].width,K[ne].height,Ie,ve,K[ne].data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,de,K[ne].width,K[ne].height,0,Ie,ve,K[ne].data);for(let R=0;R<He.length;R++){const re=He[R].image[ne].image;Fe?t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,0,0,re.width,re.height,Ie,ve,re.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,de,re.width,re.height,0,Ie,ve,re.data)}}else{Fe?t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ie,ve,K[ne]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,de,Ie,ve,K[ne]);for(let R=0;R<He.length;R++){const se=He[R];Fe?t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,0,0,Ie,ve,se.image[ne]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,de,Ie,ve,se.image[ne])}}}x(M,Ve)&&v(o.TEXTURE_CUBE_MAP),Q.__version=Z.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function pe(E,M,k,J,Z,Q){const ge=s.convert(k.format,k.colorSpace),ae=s.convert(k.type),he=_(k.internalFormat,ge,ae,k.colorSpace);if(!n.get(M).__hasExternalTextures){const ke=Math.max(1,M.width>>Q),K=Math.max(1,M.height>>Q);Z===o.TEXTURE_3D||Z===o.TEXTURE_2D_ARRAY?t.texImage3D(Z,Q,he,ke,K,M.depth,0,ge,ae,null):t.texImage2D(Z,Q,he,ke,K,0,ge,ae,null)}t.bindFramebuffer(o.FRAMEBUFFER,E),me(M)?l.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,J,Z,n.get(k).__webglTexture,0,Ce(M)):(Z===o.TEXTURE_2D||Z>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,J,Z,n.get(k).__webglTexture,Q),t.bindFramebuffer(o.FRAMEBUFFER,null)}function Ae(E,M,k){if(o.bindRenderbuffer(o.RENDERBUFFER,E),M.depthBuffer&&!M.stencilBuffer){let J=a===!0?o.DEPTH_COMPONENT24:o.DEPTH_COMPONENT16;if(k||me(M)){const Z=M.depthTexture;Z&&Z.isDepthTexture&&(Z.type===Rn?J=o.DEPTH_COMPONENT32F:Z.type===Xn&&(J=o.DEPTH_COMPONENT24));const Q=Ce(M);me(M)?l.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Q,J,M.width,M.height):o.renderbufferStorageMultisample(o.RENDERBUFFER,Q,J,M.width,M.height)}else o.renderbufferStorage(o.RENDERBUFFER,J,M.width,M.height);o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.RENDERBUFFER,E)}else if(M.depthBuffer&&M.stencilBuffer){const J=Ce(M);k&&me(M)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,J,o.DEPTH24_STENCIL8,M.width,M.height):me(M)?l.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,J,o.DEPTH24_STENCIL8,M.width,M.height):o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_STENCIL,M.width,M.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.RENDERBUFFER,E)}else{const J=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Z=0;Z<J.length;Z++){const Q=J[Z],ge=s.convert(Q.format,Q.colorSpace),ae=s.convert(Q.type),he=_(Q.internalFormat,ge,ae,Q.colorSpace),Me=Ce(M);k&&me(M)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,Me,he,M.width,M.height):me(M)?l.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Me,he,M.width,M.height):o.renderbufferStorage(o.RENDERBUFFER,he,M.width,M.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function De(E,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(o.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),G(M.depthTexture,0);const J=n.get(M.depthTexture).__webglTexture,Z=Ce(M);if(M.depthTexture.format===hi)me(M)?l.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,J,0,Z):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,J,0);else if(M.depthTexture.format===Ki)me(M)?l.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,J,0,Z):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Se(E){const M=n.get(E),k=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");De(M.__webglFramebuffer,E)}else if(k){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]=o.createRenderbuffer(),Ae(M.__webglDepthbuffer[J],E,!1)}else t.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=o.createRenderbuffer(),Ae(M.__webglDepthbuffer,E,!1);t.bindFramebuffer(o.FRAMEBUFFER,null)}function qe(E,M,k){const J=n.get(E);M!==void 0&&pe(J.__webglFramebuffer,E,E.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),k!==void 0&&Se(E)}function B(E){const M=E.texture,k=n.get(E),J=n.get(M);E.addEventListener("dispose",L),E.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=o.createTexture()),J.__version=M.version,r.memory.textures++);const Z=E.isWebGLCubeRenderTarget===!0,Q=E.isWebGLMultipleRenderTargets===!0,ge=m(E)||a;if(Z){k.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[ae]=[];for(let he=0;he<M.mipmaps.length;he++)k.__webglFramebuffer[ae][he]=o.createFramebuffer()}else k.__webglFramebuffer[ae]=o.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let ae=0;ae<M.mipmaps.length;ae++)k.__webglFramebuffer[ae]=o.createFramebuffer()}else k.__webglFramebuffer=o.createFramebuffer();if(Q)if(i.drawBuffers){const ae=E.texture;for(let he=0,Me=ae.length;he<Me;he++){const ke=n.get(ae[he]);ke.__webglTexture===void 0&&(ke.__webglTexture=o.createTexture(),r.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&me(E)===!1){const ae=Q?M:[M];k.__webglMultisampledFramebuffer=o.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(o.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let he=0;he<ae.length;he++){const Me=ae[he];k.__webglColorRenderbuffer[he]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,k.__webglColorRenderbuffer[he]);const ke=s.convert(Me.format,Me.colorSpace),K=s.convert(Me.type),Qe=_(Me.internalFormat,ke,K,Me.colorSpace,E.isXRRenderTarget===!0),Ve=Ce(E);o.renderbufferStorageMultisample(o.RENDERBUFFER,Ve,Qe,E.width,E.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+he,o.RENDERBUFFER,k.__webglColorRenderbuffer[he])}o.bindRenderbuffer(o.RENDERBUFFER,null),E.depthBuffer&&(k.__webglDepthRenderbuffer=o.createRenderbuffer(),Ae(k.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Z){t.bindTexture(o.TEXTURE_CUBE_MAP,J.__webglTexture),V(o.TEXTURE_CUBE_MAP,M,ge);for(let ae=0;ae<6;ae++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)pe(k.__webglFramebuffer[ae][he],E,M,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ae,he);else pe(k.__webglFramebuffer[ae],E,M,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);x(M,ge)&&v(o.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const ae=E.texture;for(let he=0,Me=ae.length;he<Me;he++){const ke=ae[he],K=n.get(ke);t.bindTexture(o.TEXTURE_2D,K.__webglTexture),V(o.TEXTURE_2D,ke,ge),pe(k.__webglFramebuffer,E,ke,o.COLOR_ATTACHMENT0+he,o.TEXTURE_2D,0),x(ke,ge)&&v(o.TEXTURE_2D)}t.unbindTexture()}else{let ae=o.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?ae=E.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ae,J.__webglTexture),V(ae,M,ge),a&&M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)pe(k.__webglFramebuffer[he],E,M,o.COLOR_ATTACHMENT0,ae,he);else pe(k.__webglFramebuffer,E,M,o.COLOR_ATTACHMENT0,ae,0);x(M,ge)&&v(ae),t.unbindTexture()}E.depthBuffer&&Se(E)}function Bt(E){const M=m(E)||a,k=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let J=0,Z=k.length;J<Z;J++){const Q=k[J];if(x(Q,M)){const ge=E.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:o.TEXTURE_2D,ae=n.get(Q).__webglTexture;t.bindTexture(ge,ae),v(ge),t.unbindTexture()}}}function xe(E){if(a&&E.samples>0&&me(E)===!1){const M=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],k=E.width,J=E.height;let Z=o.COLOR_BUFFER_BIT;const Q=[],ge=E.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ae=n.get(E),he=E.isWebGLMultipleRenderTargets===!0;if(he)for(let Me=0;Me<M.length;Me++)t.bindFramebuffer(o.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Me,o.RENDERBUFFER,null),t.bindFramebuffer(o.FRAMEBUFFER,ae.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Me,o.TEXTURE_2D,null,0);t.bindFramebuffer(o.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let Me=0;Me<M.length;Me++){Q.push(o.COLOR_ATTACHMENT0+Me),E.depthBuffer&&Q.push(ge);const ke=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(ke===!1&&(E.depthBuffer&&(Z|=o.DEPTH_BUFFER_BIT),E.stencilBuffer&&(Z|=o.STENCIL_BUFFER_BIT)),he&&o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,ae.__webglColorRenderbuffer[Me]),ke===!0&&(o.invalidateFramebuffer(o.READ_FRAMEBUFFER,[ge]),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[ge])),he){const K=n.get(M[Me]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,K,0)}o.blitFramebuffer(0,0,k,J,0,0,k,J,Z,o.NEAREST),c&&o.invalidateFramebuffer(o.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(o.READ_FRAMEBUFFER,null),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),he)for(let Me=0;Me<M.length;Me++){t.bindFramebuffer(o.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Me,o.RENDERBUFFER,ae.__webglColorRenderbuffer[Me]);const ke=n.get(M[Me]).__webglTexture;t.bindFramebuffer(o.FRAMEBUFFER,ae.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Me,o.TEXTURE_2D,ke,0)}t.bindFramebuffer(o.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function Ce(E){return Math.min(i.maxSamples,E.samples)}function me(E){const M=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function lt(E){const M=r.render.frame;h.get(E)!==M&&(h.set(E,M),E.update())}function Ue(E,M){const k=E.colorSpace,J=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Fo||k!==It&&k!==rn&&(Ze.getTransfer(k)===ot?a===!1?e.has("EXT_sRGB")===!0&&J===sn?(E.format=Fo,E.minFilter=Vt,E.generateMipmaps=!1):M=Uc.sRGBToLinear(M):(J!==sn||Z!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}this.allocateTextureUnit=P,this.resetTextureUnits=Y,this.setTexture2D=G,this.setTexture2DArray=j,this.setTexture3D=W,this.setTextureCube=X,this.rebindTextures=qe,this.setupRenderTarget=B,this.updateRenderTargetMipmap=Bt,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=me}function Hg(o,e,t){const n=t.isWebGL2;function i(s,r=rn){let a;const l=Ze.getTransfer(r);if(s===Zn)return o.UNSIGNED_BYTE;if(s===Ec)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Tc)return o.UNSIGNED_SHORT_5_5_5_1;if(s===od)return o.BYTE;if(s===ad)return o.SHORT;if(s===Yo)return o.UNSIGNED_SHORT;if(s===wc)return o.INT;if(s===Xn)return o.UNSIGNED_INT;if(s===Rn)return o.FLOAT;if(s===vs)return n?o.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===ld)return o.ALPHA;if(s===sn)return o.RGBA;if(s===cd)return o.LUMINANCE;if(s===hd)return o.LUMINANCE_ALPHA;if(s===hi)return o.DEPTH_COMPONENT;if(s===Ki)return o.DEPTH_STENCIL;if(s===Fo)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===dd)return o.RED;if(s===Ac)return o.RED_INTEGER;if(s===ud)return o.RG;if(s===Ic)return o.RG_INTEGER;if(s===Cc)return o.RGBA_INTEGER;if(s===Or||s===zr||s===Hr||s===Gr)if(l===ot)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Or)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===zr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Gr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Or)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===zr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Hr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Gr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ta||s===Aa||s===Ia||s===Ca)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Ta)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Aa)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ia)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ca)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Rc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ra||s===Pa)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Ra)return l===ot?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Pa)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===La||s===Da||s===Fa||s===Ba||s===Ua||s===ka||s===Na||s===Oa||s===za||s===Ha||s===Ga||s===Va||s===Wa||s===$a)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===La)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Da)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Fa)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ba)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ua)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ka)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Na)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Oa)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===za)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ha)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ga)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Va)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Wa)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===$a)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Vr||s===Xa||s===ja)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Vr)return l===ot?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Xa)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ja)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===pd||s===qa||s===Ya||s===Ka)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Vr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===qa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ya)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ka)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ci?n?o.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):o[s]!==void 0?o[s]:null}return{convert:i}}class Gg extends _t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Dt extends rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vg={type:"move"};class fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,n),f=this._getHandJoint(c,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vg)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Wg extends _i{constructor(e,t){super();const n=this;let i=null,s=1,r=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const y=t.getContextAttributes();let m=null,f=null;const x=[],v=[],_=new Ee;let C=null;const A=new _t;A.layers.enable(1),A.viewport=new Ye;const I=new _t;I.layers.enable(2),I.viewport=new Ye;const L=[A,I],b=new Gg;b.layers.enable(1),b.layers.enable(2);let S=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let q=x[V];return q===void 0&&(q=new fo,x[V]=q),q.getTargetRaySpace()},this.getControllerGrip=function(V){let q=x[V];return q===void 0&&(q=new fo,x[V]=q),q.getGripSpace()},this.getHand=function(V){let q=x[V];return q===void 0&&(q=new fo,x[V]=q),q.getHandSpace()};function z(V){const q=v.indexOf(V.inputSource);if(q===-1)return;const oe=x[q];oe!==void 0&&(oe.update(V.inputSource,V.frame,c||r),oe.dispatchEvent({type:V.type,data:V.inputSource}))}function Y(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",P);for(let V=0;V<x.length;V++){const q=v[V];q!==null&&(v[V]=null,x[V].disconnect(q))}S=null,O=null,e.setRenderTarget(m),p=null,u=null,d=null,i=null,f=null,ee.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(_.width,_.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(V){if(i=V,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",P),y.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(_),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const q={antialias:i.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,q),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new fi(p.framebufferWidth,p.framebufferHeight,{format:sn,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let q=null,oe=null,fe=null;y.depth&&(fe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=y.stencil?Ki:hi,oe=y.stencil?ci:Xn);const pe={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:s};d=new XRWebGLBinding(i,t),u=d.createProjectionLayer(pe),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),f=new fi(u.textureWidth,u.textureHeight,{format:sn,type:Zn,depthTexture:new $c(u.textureWidth,u.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const Ae=e.properties.get(f);Ae.__ignoreDepthValues=u.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(a),ee.setContext(i),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(V){for(let q=0;q<V.removed.length;q++){const oe=V.removed[q],fe=v.indexOf(oe);fe>=0&&(v[fe]=null,x[fe].disconnect(oe))}for(let q=0;q<V.added.length;q++){const oe=V.added[q];let fe=v.indexOf(oe);if(fe===-1){for(let Ae=0;Ae<x.length;Ae++)if(Ae>=v.length){v.push(oe),fe=Ae;break}else if(v[Ae]===null){v[Ae]=oe,fe=Ae;break}if(fe===-1)break}const pe=x[fe];pe&&pe.connect(oe)}}const F=new T,G=new T;function j(V,q,oe){F.setFromMatrixPosition(q.matrixWorld),G.setFromMatrixPosition(oe.matrixWorld);const fe=F.distanceTo(G),pe=q.projectionMatrix.elements,Ae=oe.projectionMatrix.elements,De=pe[14]/(pe[10]-1),Se=pe[14]/(pe[10]+1),qe=(pe[9]+1)/pe[5],B=(pe[9]-1)/pe[5],Bt=(pe[8]-1)/pe[0],xe=(Ae[8]+1)/Ae[0],Ce=De*Bt,me=De*xe,lt=fe/(-Bt+xe),Ue=lt*-Bt;q.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Ue),V.translateZ(lt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const E=De+lt,M=Se+lt,k=Ce-Ue,J=me+(fe-Ue),Z=qe*Se/M*E,Q=B*Se/M*E;V.projectionMatrix.makePerspective(k,J,Z,Q,E,M),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function W(V,q){q===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(q.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(i===null)return;b.near=I.near=A.near=V.near,b.far=I.far=A.far=V.far,(S!==b.near||O!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),S=b.near,O=b.far);const q=V.parent,oe=b.cameras;W(b,q);for(let fe=0;fe<oe.length;fe++)W(oe[fe],q);oe.length===2?j(b,A,I):b.projectionMatrix.copy(A.projectionMatrix),X(V,b,q)};function X(V,q,oe){oe===null?V.matrix.copy(q.matrixWorld):(V.matrix.copy(oe.matrixWorld),V.matrix.invert(),V.matrix.multiply(q.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(q.projectionMatrix),V.projectionMatrixInverse.copy(q.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Ji*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(V){l=V,u!==null&&(u.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)};let $=null;function te(V,q){if(h=q.getViewerPose(c||r),g=q,h!==null){const oe=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let fe=!1;oe.length!==b.cameras.length&&(b.cameras.length=0,fe=!0);for(let pe=0;pe<oe.length;pe++){const Ae=oe[pe];let De=null;if(p!==null)De=p.getViewport(Ae);else{const qe=d.getViewSubImage(u,Ae);De=qe.viewport,pe===0&&(e.setRenderTargetTextures(f,qe.colorTexture,u.ignoreDepthValues?void 0:qe.depthStencilTexture),e.setRenderTarget(f))}let Se=L[pe];Se===void 0&&(Se=new _t,Se.layers.enable(pe),Se.viewport=new Ye,L[pe]=Se),Se.matrix.fromArray(Ae.transform.matrix),Se.matrix.decompose(Se.position,Se.quaternion,Se.scale),Se.projectionMatrix.fromArray(Ae.projectionMatrix),Se.projectionMatrixInverse.copy(Se.projectionMatrix).invert(),Se.viewport.set(De.x,De.y,De.width,De.height),pe===0&&(b.matrix.copy(Se.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),fe===!0&&b.cameras.push(Se)}}for(let oe=0;oe<x.length;oe++){const fe=v[oe],pe=x[oe];fe!==null&&pe!==void 0&&pe.update(fe,q,c||r)}$&&$(V,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),g=null}const ee=new Wc;ee.setAnimationLoop(te),this.setAnimationLoop=function(V){$=V},this.dispose=function(){}}}function $g(o,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Hc(o)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,x,v,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,x,v):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===jt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===jt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const x=e.get(f).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const v=o._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,x,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=v*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===jt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const x=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Xg(o,e,t,n){let i={},s={},r=[];const a=t.isWebGL2?o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,v){const _=v.program;n.uniformBlockBinding(x,_)}function c(x,v){let _=i[x.id];_===void 0&&(g(x),_=h(x),i[x.id]=_,x.addEventListener("dispose",m));const C=v.program;n.updateUBOMapping(x,C);const A=e.render.frame;s[x.id]!==A&&(u(x),s[x.id]=A)}function h(x){const v=d();x.__bindingPointIndex=v;const _=o.createBuffer(),C=x.__size,A=x.usage;return o.bindBuffer(o.UNIFORM_BUFFER,_),o.bufferData(o.UNIFORM_BUFFER,C,A),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,v,_),_}function d(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const v=i[x.id],_=x.uniforms,C=x.__cache;o.bindBuffer(o.UNIFORM_BUFFER,v);for(let A=0,I=_.length;A<I;A++){const L=Array.isArray(_[A])?_[A]:[_[A]];for(let b=0,S=L.length;b<S;b++){const O=L[b];if(p(O,A,b,C)===!0){const z=O.__offset,Y=Array.isArray(O.value)?O.value:[O.value];let P=0;for(let F=0;F<Y.length;F++){const G=Y[F],j=y(G);typeof G=="number"||typeof G=="boolean"?(O.__data[0]=G,o.bufferSubData(o.UNIFORM_BUFFER,z+P,O.__data)):G.isMatrix3?(O.__data[0]=G.elements[0],O.__data[1]=G.elements[1],O.__data[2]=G.elements[2],O.__data[3]=0,O.__data[4]=G.elements[3],O.__data[5]=G.elements[4],O.__data[6]=G.elements[5],O.__data[7]=0,O.__data[8]=G.elements[6],O.__data[9]=G.elements[7],O.__data[10]=G.elements[8],O.__data[11]=0):(G.toArray(O.__data,P),P+=j.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,z,O.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function p(x,v,_,C){const A=x.value,I=v+"_"+_;if(C[I]===void 0)return typeof A=="number"||typeof A=="boolean"?C[I]=A:C[I]=A.clone(),!0;{const L=C[I];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return C[I]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function g(x){const v=x.uniforms;let _=0;const C=16;for(let I=0,L=v.length;I<L;I++){const b=Array.isArray(v[I])?v[I]:[v[I]];for(let S=0,O=b.length;S<O;S++){const z=b[S],Y=Array.isArray(z.value)?z.value:[z.value];for(let P=0,F=Y.length;P<F;P++){const G=Y[P],j=y(G),W=_%C;W!==0&&C-W<j.boundary&&(_+=C-W),z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=j.storage}}}const A=_%C;return A>0&&(_+=C-A),x.__size=_,x.__cache={},this}function y(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const _=r.indexOf(v.__bindingPointIndex);r.splice(_,1),o.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function f(){for(const x in i)o.deleteBuffer(i[x]);r=[],i={},s={}}return{bind:l,update:c,dispose:f}}class As{constructor(e={}){const{canvas:t=Hd(),context:n=null,depth:i=!0,stencil:s=!0,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=r;const p=new Uint32Array(4),g=new Int32Array(4);let y=null,m=null;const f=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=tt,this._useLegacyLights=!1,this.toneMapping=Kn,this.toneMappingExposure=1;const v=this;let _=!1,C=0,A=0,I=null,L=-1,b=null;const S=new Ye,O=new Ye;let z=null;const Y=new ce(0);let P=0,F=t.width,G=t.height,j=1,W=null,X=null;const $=new Ye(0,0,F,G),te=new Ye(0,0,F,G);let ee=!1;const V=new ta;let q=!1,oe=!1,fe=null;const pe=new ue,Ae=new Ee,De=new T,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qe(){return I===null?j:1}let B=n;function Bt(w,D){for(let N=0;N<w.length;N++){const H=w[N],U=t.getContext(H,D);if(U!==null)return U}return null}try{const w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${jo}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",se,!1),B===null){const D=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&D.shift(),B=Bt(D,w),B===null)throw Bt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let xe,Ce,me,lt,Ue,E,M,k,J,Z,Q,ge,ae,he,Me,ke,K,Qe,Ve,Ie,ve,de,Fe,Je;function ut(){xe=new nm(B),Ce=new Kf(B,xe,e),xe.init(Ce),de=new Hg(B,xe,Ce),me=new Og(B,xe,Ce),lt=new rm(B),Ue=new Eg,E=new zg(B,xe,me,Ue,Ce,de,lt),M=new Jf(v),k=new tm(v),J=new uu(B,Ce),Fe=new qf(B,xe,J,Ce),Z=new im(B,J,lt,Fe),Q=new cm(B,Z,J,lt),Ve=new lm(B,Ce,E),ke=new Zf(Ue),ge=new wg(v,M,k,xe,Ce,Fe,ke),ae=new $g(v,Ue),he=new Ag,Me=new Dg(xe,Ce),Qe=new jf(v,M,k,me,Q,u,l),K=new Ng(v,Q,Ce),Je=new Xg(B,lt,Ce,me),Ie=new Yf(B,xe,lt,Ce),ve=new sm(B,xe,lt,Ce),lt.programs=ge.programs,v.capabilities=Ce,v.extensions=xe,v.properties=Ue,v.renderLists=he,v.shadowMap=K,v.state=me,v.info=lt}ut();const He=new Wg(v,B);this.xr=He,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const w=xe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=xe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(w){w!==void 0&&(j=w,this.setSize(F,G,!1))},this.getSize=function(w){return w.set(F,G)},this.setSize=function(w,D,N=!0){if(He.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=w,G=D,t.width=Math.floor(w*j),t.height=Math.floor(D*j),N===!0&&(t.style.width=w+"px",t.style.height=D+"px"),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(F*j,G*j).floor()},this.setDrawingBufferSize=function(w,D,N){F=w,G=D,j=N,t.width=Math.floor(w*N),t.height=Math.floor(D*N),this.setViewport(0,0,w,D)},this.getCurrentViewport=function(w){return w.copy(S)},this.getViewport=function(w){return w.copy($)},this.setViewport=function(w,D,N,H){w.isVector4?$.set(w.x,w.y,w.z,w.w):$.set(w,D,N,H),me.viewport(S.copy($).multiplyScalar(j).floor())},this.getScissor=function(w){return w.copy(te)},this.setScissor=function(w,D,N,H){w.isVector4?te.set(w.x,w.y,w.z,w.w):te.set(w,D,N,H),me.scissor(O.copy(te).multiplyScalar(j).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(w){me.setScissorTest(ee=w)},this.setOpaqueSort=function(w){W=w},this.setTransparentSort=function(w){X=w},this.getClearColor=function(w){return w.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor.apply(Qe,arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha.apply(Qe,arguments)},this.clear=function(w=!0,D=!0,N=!0){let H=0;if(w){let U=!1;if(I!==null){const le=I.texture.format;U=le===Cc||le===Ic||le===Ac}if(U){const le=I.texture.type,ye=le===Zn||le===Xn||le===Yo||le===ci||le===Ec||le===Tc,be=Qe.getClearColor(),Te=Qe.getClearAlpha(),Ne=be.r,Re=be.g,Pe=be.b;ye?(p[0]=Ne,p[1]=Re,p[2]=Pe,p[3]=Te,B.clearBufferuiv(B.COLOR,0,p)):(g[0]=Ne,g[1]=Re,g[2]=Pe,g[3]=Te,B.clearBufferiv(B.COLOR,0,g))}else H|=B.COLOR_BUFFER_BIT}D&&(H|=B.DEPTH_BUFFER_BIT),N&&(H|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",se,!1),he.dispose(),Me.dispose(),Ue.dispose(),M.dispose(),k.dispose(),Q.dispose(),Fe.dispose(),Je.dispose(),ge.dispose(),He.dispose(),He.removeEventListener("sessionstart",Ut),He.removeEventListener("sessionend",st),fe&&(fe.dispose(),fe=null),kt.stop()};function ne(w){w.preventDefault(),_=!0}function R(){_=!1;const w=lt.autoReset,D=K.enabled,N=K.autoUpdate,H=K.needsUpdate,U=K.type;ut(),lt.autoReset=w,K.enabled=D,K.autoUpdate=N,K.needsUpdate=H,K.type=U}function se(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function re(w){const D=w.target;D.removeEventListener("dispose",re),we(D)}function we(w){_e(w),Ue.remove(w)}function _e(w){const D=Ue.get(w).programs;D!==void 0&&(D.forEach(function(N){ge.releaseProgram(N)}),w.isShaderMaterial&&ge.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,N,H,U,le){D===null&&(D=Se);const ye=U.isMesh&&U.matrixWorld.determinant()<0,be=Sh(w,D,N,H,U);me.setMaterial(H,ye);let Te=N.index,Ne=1;if(H.wireframe===!0){if(Te=Z.getWireframeAttribute(N),Te===void 0)return;Ne=2}const Re=N.drawRange,Pe=N.attributes.position;let gt=Re.start*Ne,Kt=(Re.start+Re.count)*Ne;le!==null&&(gt=Math.max(gt,le.start*Ne),Kt=Math.min(Kt,(le.start+le.count)*Ne)),Te!==null?(gt=Math.max(gt,0),Kt=Math.min(Kt,Te.count)):Pe!=null&&(gt=Math.max(gt,0),Kt=Math.min(Kt,Pe.count));const wt=Kt-gt;if(wt<0||wt===1/0)return;Fe.setup(U,H,be,N,Te);let bn,ct=Ie;if(Te!==null&&(bn=J.get(Te),ct=ve,ct.setIndex(bn)),U.isMesh)H.wireframe===!0?(me.setLineWidth(H.wireframeLinewidth*qe()),ct.setMode(B.LINES)):ct.setMode(B.TRIANGLES);else if(U.isLine){let Ge=H.linewidth;Ge===void 0&&(Ge=1),me.setLineWidth(Ge*qe()),U.isLineSegments?ct.setMode(B.LINES):U.isLineLoop?ct.setMode(B.LINE_LOOP):ct.setMode(B.LINE_STRIP)}else U.isPoints?ct.setMode(B.POINTS):U.isSprite&&ct.setMode(B.TRIANGLES);if(U.isBatchedMesh)ct.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else if(U.isInstancedMesh)ct.renderInstances(gt,wt,U.count);else if(N.isInstancedBufferGeometry){const Ge=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,Br=Math.min(N.instanceCount,Ge);ct.renderInstances(gt,wt,Br)}else ct.render(gt,wt)};function nt(w,D,N){w.transparent===!0&&w.side===nn&&w.forceSinglePass===!1?(w.side=jt,w.needsUpdate=!0,Ds(w,D,N),w.side=Dn,w.needsUpdate=!0,Ds(w,D,N),w.side=nn):Ds(w,D,N)}this.compile=function(w,D,N=null){N===null&&(N=w),m=Me.get(N),m.init(),x.push(m),N.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),w!==N&&w.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights(v._useLegacyLights);const H=new Set;return w.traverse(function(U){const le=U.material;if(le)if(Array.isArray(le))for(let ye=0;ye<le.length;ye++){const be=le[ye];nt(be,N,U),H.add(be)}else nt(le,N,U),H.add(le)}),x.pop(),m=null,H},this.compileAsync=function(w,D,N=null){const H=this.compile(w,D,N);return new Promise(U=>{function le(){if(H.forEach(function(ye){Ue.get(ye).currentProgram.isReady()&&H.delete(ye)}),H.size===0){U(w);return}setTimeout(le,10)}xe.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let it=null;function St(w){it&&it(w)}function Ut(){kt.stop()}function st(){kt.start()}const kt=new Wc;kt.setAnimationLoop(St),typeof self<"u"&&kt.setContext(self),this.setAnimationLoop=function(w){it=w,He.setAnimationLoop(w),w===null?kt.stop():kt.start()},He.addEventListener("sessionstart",Ut),He.addEventListener("sessionend",st),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(D),D=He.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,D,I),m=Me.get(w,x.length),m.init(),x.push(m),pe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),V.setFromProjectionMatrix(pe),oe=this.localClippingEnabled,q=ke.init(this.clippingPlanes,oe),y=he.get(w,f.length),y.init(),f.push(y),yn(w,D,0,v.sortObjects),y.finish(),v.sortObjects===!0&&y.sort(W,X),this.info.render.frame++,q===!0&&ke.beginShadows();const N=m.state.shadowsArray;if(K.render(N,w,D),q===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),Qe.render(y,w),m.setupLights(v._useLegacyLights),D.isArrayCamera){const H=D.cameras;for(let U=0,le=H.length;U<le;U++){const ye=H[U];pa(y,w,ye,ye.viewport)}}else pa(y,w,D);I!==null&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(v,w,D),Fe.resetDefaultState(),L=-1,b=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,f.pop(),f.length>0?y=f[f.length-1]:y=null};function yn(w,D,N,H){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)N=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||V.intersectsSprite(w)){H&&De.setFromMatrixPosition(w.matrixWorld).applyMatrix4(pe);const ye=Q.update(w),be=w.material;be.visible&&y.push(w,ye,be,N,De.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||V.intersectsObject(w))){const ye=Q.update(w),be=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),De.copy(w.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),De.copy(ye.boundingSphere.center)),De.applyMatrix4(w.matrixWorld).applyMatrix4(pe)),Array.isArray(be)){const Te=ye.groups;for(let Ne=0,Re=Te.length;Ne<Re;Ne++){const Pe=Te[Ne],gt=be[Pe.materialIndex];gt&&gt.visible&&y.push(w,ye,gt,N,De.z,Pe)}}else be.visible&&y.push(w,ye,be,N,De.z,null)}}const le=w.children;for(let ye=0,be=le.length;ye<be;ye++)yn(le[ye],D,N,H)}function pa(w,D,N,H){const U=w.opaque,le=w.transmissive,ye=w.transparent;m.setupLightsView(N),q===!0&&ke.setGlobalState(v.clippingPlanes,N),le.length>0&&Mh(U,le,D,N),H&&me.viewport(S.copy(H)),U.length>0&&Ls(U,D,N),le.length>0&&Ls(le,D,N),ye.length>0&&Ls(ye,D,N),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Mh(w,D,N,H){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;const le=Ce.isWebGL2;fe===null&&(fe=new fi(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?vs:Zn,minFilter:pi,samples:le?4:0})),v.getDrawingBufferSize(Ae),le?fe.setSize(Ae.x,Ae.y):fe.setSize(br(Ae.x),br(Ae.y));const ye=v.getRenderTarget();v.setRenderTarget(fe),v.getClearColor(Y),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const be=v.toneMapping;v.toneMapping=Kn,Ls(w,N,H),E.updateMultisampleRenderTarget(fe),E.updateRenderTargetMipmap(fe);let Te=!1;for(let Ne=0,Re=D.length;Ne<Re;Ne++){const Pe=D[Ne],gt=Pe.object,Kt=Pe.geometry,wt=Pe.material,bn=Pe.group;if(wt.side===nn&&gt.layers.test(H.layers)){const ct=wt.side;wt.side=jt,wt.needsUpdate=!0,fa(gt,N,H,Kt,wt,bn),wt.side=ct,wt.needsUpdate=!0,Te=!0}}Te===!0&&(E.updateMultisampleRenderTarget(fe),E.updateRenderTargetMipmap(fe)),v.setRenderTarget(ye),v.setClearColor(Y,P),v.toneMapping=be}function Ls(w,D,N){const H=D.isScene===!0?D.overrideMaterial:null;for(let U=0,le=w.length;U<le;U++){const ye=w[U],be=ye.object,Te=ye.geometry,Ne=H===null?ye.material:H,Re=ye.group;be.layers.test(N.layers)&&fa(be,D,N,Te,Ne,Re)}}function fa(w,D,N,H,U,le){w.onBeforeRender(v,D,N,H,U,le),w.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),U.onBeforeRender(v,D,N,H,w,le),U.transparent===!0&&U.side===nn&&U.forceSinglePass===!1?(U.side=jt,U.needsUpdate=!0,v.renderBufferDirect(N,D,H,U,w,le),U.side=Dn,U.needsUpdate=!0,v.renderBufferDirect(N,D,H,U,w,le),U.side=nn):v.renderBufferDirect(N,D,H,U,w,le),w.onAfterRender(v,D,N,H,U,le)}function Ds(w,D,N){D.isScene!==!0&&(D=Se);const H=Ue.get(w),U=m.state.lights,le=m.state.shadowsArray,ye=U.state.version,be=ge.getParameters(w,U.state,le,D,N),Te=ge.getProgramCacheKey(be);let Ne=H.programs;H.environment=w.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(w.isMeshStandardMaterial?k:M).get(w.envMap||H.environment),Ne===void 0&&(w.addEventListener("dispose",re),Ne=new Map,H.programs=Ne);let Re=Ne.get(Te);if(Re!==void 0){if(H.currentProgram===Re&&H.lightsStateVersion===ye)return ga(w,be),Re}else be.uniforms=ge.getUniforms(w),w.onBuild(N,be,v),w.onBeforeCompile(be,v),Re=ge.acquireProgram(be,Te),Ne.set(Te,Re),H.uniforms=be.uniforms;const Pe=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Pe.clippingPlanes=ke.uniform),ga(w,be),H.needsLights=Eh(w),H.lightsStateVersion=ye,H.needsLights&&(Pe.ambientLightColor.value=U.state.ambient,Pe.lightProbe.value=U.state.probe,Pe.directionalLights.value=U.state.directional,Pe.directionalLightShadows.value=U.state.directionalShadow,Pe.spotLights.value=U.state.spot,Pe.spotLightShadows.value=U.state.spotShadow,Pe.rectAreaLights.value=U.state.rectArea,Pe.ltc_1.value=U.state.rectAreaLTC1,Pe.ltc_2.value=U.state.rectAreaLTC2,Pe.pointLights.value=U.state.point,Pe.pointLightShadows.value=U.state.pointShadow,Pe.hemisphereLights.value=U.state.hemi,Pe.directionalShadowMap.value=U.state.directionalShadowMap,Pe.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Pe.spotShadowMap.value=U.state.spotShadowMap,Pe.spotLightMatrix.value=U.state.spotLightMatrix,Pe.spotLightMap.value=U.state.spotLightMap,Pe.pointShadowMap.value=U.state.pointShadowMap,Pe.pointShadowMatrix.value=U.state.pointShadowMatrix),H.currentProgram=Re,H.uniformsList=null,Re}function ma(w){if(w.uniformsList===null){const D=w.currentProgram.getUniforms();w.uniformsList=ur.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function ga(w,D){const N=Ue.get(w);N.outputColorSpace=D.outputColorSpace,N.batching=D.batching,N.instancing=D.instancing,N.instancingColor=D.instancingColor,N.skinning=D.skinning,N.morphTargets=D.morphTargets,N.morphNormals=D.morphNormals,N.morphColors=D.morphColors,N.morphTargetsCount=D.morphTargetsCount,N.numClippingPlanes=D.numClippingPlanes,N.numIntersection=D.numClipIntersection,N.vertexAlphas=D.vertexAlphas,N.vertexTangents=D.vertexTangents,N.toneMapping=D.toneMapping}function Sh(w,D,N,H,U){D.isScene!==!0&&(D=Se),E.resetTextureUnits();const le=D.fog,ye=H.isMeshStandardMaterial?D.environment:null,be=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:It,Te=(H.isMeshStandardMaterial?k:M).get(H.envMap||ye),Ne=H.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Re=!!N.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pe=!!N.morphAttributes.position,gt=!!N.morphAttributes.normal,Kt=!!N.morphAttributes.color;let wt=Kn;H.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(wt=v.toneMapping);const bn=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ct=bn!==void 0?bn.length:0,Ge=Ue.get(H),Br=m.state.lights;if(q===!0&&(oe===!0||w!==b)){const Qt=w===b&&H.id===L;ke.setState(H,w,Qt)}let pt=!1;H.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Br.state.version||Ge.outputColorSpace!==be||U.isBatchedMesh&&Ge.batching===!1||!U.isBatchedMesh&&Ge.batching===!0||U.isInstancedMesh&&Ge.instancing===!1||!U.isInstancedMesh&&Ge.instancing===!0||U.isSkinnedMesh&&Ge.skinning===!1||!U.isSkinnedMesh&&Ge.skinning===!0||U.isInstancedMesh&&Ge.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ge.instancingColor===!1&&U.instanceColor!==null||Ge.envMap!==Te||H.fog===!0&&Ge.fog!==le||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==ke.numPlanes||Ge.numIntersection!==ke.numIntersection)||Ge.vertexAlphas!==Ne||Ge.vertexTangents!==Re||Ge.morphTargets!==Pe||Ge.morphNormals!==gt||Ge.morphColors!==Kt||Ge.toneMapping!==wt||Ce.isWebGL2===!0&&Ge.morphTargetsCount!==ct)&&(pt=!0):(pt=!0,Ge.__version=H.version);let Qn=Ge.currentProgram;pt===!0&&(Qn=Ds(H,D,U));let ya=!1,rs=!1,Ur=!1;const Ct=Qn.getUniforms(),ei=Ge.uniforms;if(me.useProgram(Qn.program)&&(ya=!0,rs=!0,Ur=!0),H.id!==L&&(L=H.id,rs=!0),ya||b!==w){Ct.setValue(B,"projectionMatrix",w.projectionMatrix),Ct.setValue(B,"viewMatrix",w.matrixWorldInverse);const Qt=Ct.map.cameraPosition;Qt!==void 0&&Qt.setValue(B,De.setFromMatrixPosition(w.matrixWorld)),Ce.logarithmicDepthBuffer&&Ct.setValue(B,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Ct.setValue(B,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,rs=!0,Ur=!0)}if(U.isSkinnedMesh){Ct.setOptional(B,U,"bindMatrix"),Ct.setOptional(B,U,"bindMatrixInverse");const Qt=U.skeleton;Qt&&(Ce.floatVertexTextures?(Qt.boneTexture===null&&Qt.computeBoneTexture(),Ct.setValue(B,"boneTexture",Qt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}U.isBatchedMesh&&(Ct.setOptional(B,U,"batchingTexture"),Ct.setValue(B,"batchingTexture",U._matricesTexture,E));const kr=N.morphAttributes;if((kr.position!==void 0||kr.normal!==void 0||kr.color!==void 0&&Ce.isWebGL2===!0)&&Ve.update(U,N,Qn),(rs||Ge.receiveShadow!==U.receiveShadow)&&(Ge.receiveShadow=U.receiveShadow,Ct.setValue(B,"receiveShadow",U.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(ei.envMap.value=Te,ei.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),rs&&(Ct.setValue(B,"toneMappingExposure",v.toneMappingExposure),Ge.needsLights&&wh(ei,Ur),le&&H.fog===!0&&ae.refreshFogUniforms(ei,le),ae.refreshMaterialUniforms(ei,H,j,G,fe),ur.upload(B,ma(Ge),ei,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ur.upload(B,ma(Ge),ei,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Ct.setValue(B,"center",U.center),Ct.setValue(B,"modelViewMatrix",U.modelViewMatrix),Ct.setValue(B,"normalMatrix",U.normalMatrix),Ct.setValue(B,"modelMatrix",U.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Qt=H.uniformsGroups;for(let Nr=0,Th=Qt.length;Nr<Th;Nr++)if(Ce.isWebGL2){const va=Qt[Nr];Je.update(va,Qn),Je.bind(va,Qn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Qn}function wh(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function Eh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,D,N){Ue.get(w.texture).__webglTexture=D,Ue.get(w.depthTexture).__webglTexture=N;const H=Ue.get(w);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=N===void 0,H.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,D){const N=Ue.get(w);N.__webglFramebuffer=D,N.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,N=0){I=w,C=D,A=N;let H=!0,U=null,le=!1,ye=!1;if(w){const Te=Ue.get(w);Te.__useDefaultFramebuffer!==void 0?(me.bindFramebuffer(B.FRAMEBUFFER,null),H=!1):Te.__webglFramebuffer===void 0?E.setupRenderTarget(w):Te.__hasExternalTextures&&E.rebindTextures(w,Ue.get(w.texture).__webglTexture,Ue.get(w.depthTexture).__webglTexture);const Ne=w.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(ye=!0);const Re=Ue.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Re[D])?U=Re[D][N]:U=Re[D],le=!0):Ce.isWebGL2&&w.samples>0&&E.useMultisampledRTT(w)===!1?U=Ue.get(w).__webglMultisampledFramebuffer:Array.isArray(Re)?U=Re[N]:U=Re,S.copy(w.viewport),O.copy(w.scissor),z=w.scissorTest}else S.copy($).multiplyScalar(j).floor(),O.copy(te).multiplyScalar(j).floor(),z=ee;if(me.bindFramebuffer(B.FRAMEBUFFER,U)&&Ce.drawBuffers&&H&&me.drawBuffers(w,U),me.viewport(S),me.scissor(O),me.setScissorTest(z),le){const Te=Ue.get(w.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+D,Te.__webglTexture,N)}else if(ye){const Te=Ue.get(w.texture),Ne=D||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Te.__webglTexture,N||0,Ne)}L=-1},this.readRenderTargetPixels=function(w,D,N,H,U,le,ye){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ue.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(be=be[ye]),be){me.bindFramebuffer(B.FRAMEBUFFER,be);try{const Te=w.texture,Ne=Te.format,Re=Te.type;if(Ne!==sn&&de.convert(Ne)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Pe=Re===vs&&(xe.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Re!==Zn&&de.convert(Re)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Re===Rn&&(Ce.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Pe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-H&&N>=0&&N<=w.height-U&&B.readPixels(D,N,H,U,de.convert(Ne),de.convert(Re),le)}finally{const Te=I!==null?Ue.get(I).__webglFramebuffer:null;me.bindFramebuffer(B.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(w,D,N=0){const H=Math.pow(2,-N),U=Math.floor(D.image.width*H),le=Math.floor(D.image.height*H);E.setTexture2D(D,0),B.copyTexSubImage2D(B.TEXTURE_2D,N,0,0,w.x,w.y,U,le),me.unbindTexture()},this.copyTextureToTexture=function(w,D,N,H=0){const U=D.image.width,le=D.image.height,ye=de.convert(N.format),be=de.convert(N.type);E.setTexture2D(N,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,N.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,N.unpackAlignment),D.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,H,w.x,w.y,U,le,ye,be,D.image.data):D.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,H,w.x,w.y,D.mipmaps[0].width,D.mipmaps[0].height,ye,D.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,H,w.x,w.y,ye,be,D.image),H===0&&N.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),me.unbindTexture()},this.copyTextureToTexture3D=function(w,D,N,H,U=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const le=w.max.x-w.min.x+1,ye=w.max.y-w.min.y+1,be=w.max.z-w.min.z+1,Te=de.convert(H.format),Ne=de.convert(H.type);let Re;if(H.isData3DTexture)E.setTexture3D(H,0),Re=B.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)E.setTexture2DArray(H,0),Re=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment);const Pe=B.getParameter(B.UNPACK_ROW_LENGTH),gt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Kt=B.getParameter(B.UNPACK_SKIP_PIXELS),wt=B.getParameter(B.UNPACK_SKIP_ROWS),bn=B.getParameter(B.UNPACK_SKIP_IMAGES),ct=N.isCompressedTexture?N.mipmaps[U]:N.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,ct.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ct.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,w.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,w.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,w.min.z),N.isDataTexture||N.isData3DTexture?B.texSubImage3D(Re,U,D.x,D.y,D.z,le,ye,be,Te,Ne,ct.data):N.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Re,U,D.x,D.y,D.z,le,ye,be,Te,ct.data)):B.texSubImage3D(Re,U,D.x,D.y,D.z,le,ye,be,Te,Ne,ct),B.pixelStorei(B.UNPACK_ROW_LENGTH,Pe),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,gt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Kt),B.pixelStorei(B.UNPACK_SKIP_ROWS,wt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,bn),U===0&&H.generateMipmaps&&B.generateMipmap(Re),me.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?E.setTextureCube(w,0):w.isData3DTexture?E.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?E.setTexture2DArray(w,0):E.setTexture2D(w,0),me.unbindTexture()},this.resetState=function(){C=0,A=0,I=null,me.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Zo?"display-p3":"srgb",t.unpackColorSpace=Ze.workingColorSpace===Ar?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===tt?di:Dc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===di?tt:It}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class jg extends As{}jg.prototype.isWebGL1Renderer=!0;class ia{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ce(e),this.near=t,this.far=n}clone(){return new ia(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Rr extends rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class qg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Do,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Nt=new T;class sa{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),s=et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new sa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Nl=new T,Ol=new Ye,zl=new Ye,Yg=new T,Hl=new ue,nr=new T,mo=new gn,Gl=new ue,go=new Es;class Zc extends Le{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ea,this.bindMatrix=new ue,this.bindMatrixInverse=new ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Yt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,nr),this.boundingBox.expandByPoint(nr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new gn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,nr),this.boundingSphere.expandByPoint(nr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mo.copy(this.boundingSphere),mo.applyMatrix4(i),e.ray.intersectsSphere(mo)!==!1&&(Gl.copy(i).invert(),go.copy(e.ray).applyMatrix4(Gl),!(this.boundingBox!==null&&go.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,go)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ye,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ea?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ol.fromBufferAttribute(i.attributes.skinIndex,e),zl.fromBufferAttribute(i.attributes.skinWeight,e),Nl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const r=zl.getComponent(s);if(r!==0){const a=Ol.getComponent(s);Hl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Yg.copy(Nl).applyMatrix4(Hl),r)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class Mr extends rt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Kg extends xt{constructor(e=null,t=1,n=1,i,s,r,a,l,c=Tt,h=Tt,d,u){super(null,r,a,l,c,h,i,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vl=new ue,Zg=new ue;class Pr{constructor(e=[],t=[]){this.uuid=mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){const a=e[s]?e[s].matrixWorld:Zg;Vl.multiplyMatrices(a,t[s]),Vl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Pr(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Kg(t,e,e,sn,Rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let r=t[s];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new Mr),this.bones.push(r),this.boneInverses.push(new ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const r=t[i];e.bones.push(r.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class ko extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ki=new ue,Wl=new ue,ir=[],$l=new Yt,Jg=new ue,hs=new Le,ds=new gn;class Qg extends Le{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ko(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Jg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),$l.copy(e.boundingBox).applyMatrix4(ki),this.boundingBox.union($l)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),ds.copy(e.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(ds)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(hs.geometry=this.geometry,hs.material=this.material,hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ds.copy(this.boundingSphere),ds.applyMatrix4(n),e.ray.intersectsSphere(ds)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ki),Wl.multiplyMatrices(n,ki),hs.matrixWorld=Wl,hs.raycast(e,ir);for(let r=0,a=ir.length;r<a;r++){const l=ir[r];l.instanceId=s,l.object=this,t.push(l)}ir.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ko(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xl=new T,jl=new T,ql=new ue,yo=new Es,sr=new gn;class ts extends rt{constructor(e=new mt,t=new Ln){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Xl.fromBufferAttribute(t,i-1),jl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Xl.distanceTo(jl);e.setAttribute("lineDistance",new Ke(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(i),sr.radius+=s,e.ray.intersectsSphere(sr)===!1)return;ql.copy(i).invert(),yo.copy(e.ray).applyMatrix4(ql);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new T,h=new T,d=new T,u=new T,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const f=Math.max(0,r.start),x=Math.min(g.count,r.start+r.count);for(let v=f,_=x-1;v<_;v+=p){const C=g.getX(v),A=g.getX(v+1);if(c.fromBufferAttribute(m,C),h.fromBufferAttribute(m,A),yo.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const L=e.ray.origin.distanceTo(u);L<e.near||L>e.far||t.push({distance:L,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,r.start),x=Math.min(m.count,r.start+r.count);for(let v=f,_=x-1;v<_;v+=p){if(c.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),yo.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(u);A<e.near||A>e.far||t.push({distance:A,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Yl=new T,Kl=new T;class bs extends ts{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Yl.fromBufferAttribute(t,i),Kl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Yl.distanceTo(Kl);e.setAttribute("lineDistance",new Ke(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class e0 extends ts{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Jc extends an{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zl=new ue,No=new Es,rr=new gn,or=new T;class t0 extends rt{constructor(e=new mt,t=new Jc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(i),rr.radius+=s,e.ray.intersectsSphere(rr)===!1)return;Zl.copy(i).invert(),No.copy(e.ray).applyMatrix4(Zl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=u,y=p;g<y;g++){const m=c.getX(g);or.fromBufferAttribute(d,m),Jl(or,m,l,i,e,t,this)}}else{const u=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let g=u,y=p;g<y;g++)or.fromBufferAttribute(d,g),Jl(or,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Jl(o,e,t,n,i,s,r){const a=No.distanceSqToPoint(o);if(a<t){const l=new T;No.closestPointToPoint(o,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:r})}}class n0{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let r;t?r=t:r=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-r,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(s-1);const h=n[i],u=n[i+1]-h,p=(r-h)/u;return(i+p)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const r=this.getPoint(i),a=this.getPoint(s),l=t||(r.isVector2?new Ee:new T);return l.copy(a).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new T,i=[],s=[],r=[],a=new T,l=new ue;for(let p=0;p<=e;p++){const g=p/e;i[p]=this.getTangentAt(g,new T)}s[0]=new T,r[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),r[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),r[p]=r[p-1].clone(),a.crossVectors(i[p-1],i[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(At(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}r[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(At(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),r[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ln extends mt{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],p=[];let g=0;const y=[],m=n/2;let f=0;x(),r===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Ke(d,3)),this.setAttribute("normal",new Ke(u,3)),this.setAttribute("uv",new Ke(p,2));function x(){const _=new T,C=new T;let A=0;const I=(t-e)/n;for(let L=0;L<=s;L++){const b=[],S=L/s,O=S*(t-e)+e;for(let z=0;z<=i;z++){const Y=z/i,P=Y*l+a,F=Math.sin(P),G=Math.cos(P);C.x=O*F,C.y=-S*n+m,C.z=O*G,d.push(C.x,C.y,C.z),_.set(F,I,G).normalize(),u.push(_.x,_.y,_.z),p.push(Y,1-S),b.push(g++)}y.push(b)}for(let L=0;L<i;L++)for(let b=0;b<s;b++){const S=y[b][L],O=y[b+1][L],z=y[b+1][L+1],Y=y[b][L+1];h.push(S,O,Y),h.push(O,z,Y),A+=6}c.addGroup(f,A,0),f+=A}function v(_){const C=g,A=new Ee,I=new T;let L=0;const b=_===!0?e:t,S=_===!0?1:-1;for(let z=1;z<=i;z++)d.push(0,m*S,0),u.push(0,S,0),p.push(.5,.5),g++;const O=g;for(let z=0;z<=i;z++){const P=z/i*l+a,F=Math.cos(P),G=Math.sin(P);I.x=b*G,I.y=m*S,I.z=b*F,d.push(I.x,I.y,I.z),u.push(0,S,0),A.x=F*.5+.5,A.y=G*.5*S+.5,p.push(A.x,A.y),g++}for(let z=0;z<i;z++){const Y=C+z,P=O+z;_===!0?h.push(P,P+1,Y):h.push(P+1,P,Y),L+=3}c.addGroup(f,L,_===!0?1:2),f+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ln(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ra extends ln{constructor(e=1,t=1,n=32,i=1,s=!1,r=0,a=Math.PI*2){super(0,e,t,n,i,s,r,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(e){return new ra(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class oa extends mt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],r=[];a(i),c(n),h(),this.setAttribute("position",new Ke(s,3)),this.setAttribute("normal",new Ke(s.slice(),3)),this.setAttribute("uv",new Ke(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new T,_=new T,C=new T;for(let A=0;A<t.length;A+=3)p(t[A+0],v),p(t[A+1],_),p(t[A+2],C),l(v,_,C,x)}function l(x,v,_,C){const A=C+1,I=[];for(let L=0;L<=A;L++){I[L]=[];const b=x.clone().lerp(_,L/A),S=v.clone().lerp(_,L/A),O=A-L;for(let z=0;z<=O;z++)z===0&&L===A?I[L][z]=b:I[L][z]=b.clone().lerp(S,z/O)}for(let L=0;L<A;L++)for(let b=0;b<2*(A-L)-1;b++){const S=Math.floor(b/2);b%2===0?(u(I[L][S+1]),u(I[L+1][S]),u(I[L][S])):(u(I[L][S+1]),u(I[L+1][S+1]),u(I[L+1][S]))}}function c(x){const v=new T;for(let _=0;_<s.length;_+=3)v.x=s[_+0],v.y=s[_+1],v.z=s[_+2],v.normalize().multiplyScalar(x),s[_+0]=v.x,s[_+1]=v.y,s[_+2]=v.z}function h(){const x=new T;for(let v=0;v<s.length;v+=3){x.x=s[v+0],x.y=s[v+1],x.z=s[v+2];const _=m(x)/2/Math.PI+.5,C=f(x)/Math.PI+.5;r.push(_,1-C)}g(),d()}function d(){for(let x=0;x<r.length;x+=6){const v=r[x+0],_=r[x+2],C=r[x+4],A=Math.max(v,_,C),I=Math.min(v,_,C);A>.9&&I<.1&&(v<.2&&(r[x+0]+=1),_<.2&&(r[x+2]+=1),C<.2&&(r[x+4]+=1))}}function u(x){s.push(x.x,x.y,x.z)}function p(x,v){const _=x*3;v.x=e[_+0],v.y=e[_+1],v.z=e[_+2]}function g(){const x=new T,v=new T,_=new T,C=new T,A=new Ee,I=new Ee,L=new Ee;for(let b=0,S=0;b<s.length;b+=9,S+=6){x.set(s[b+0],s[b+1],s[b+2]),v.set(s[b+3],s[b+4],s[b+5]),_.set(s[b+6],s[b+7],s[b+8]),A.set(r[S+0],r[S+1]),I.set(r[S+2],r[S+3]),L.set(r[S+4],r[S+5]),C.copy(x).add(v).add(_).divideScalar(3);const O=m(C);y(A,S+0,x,O),y(I,S+2,v,O),y(L,S+4,_,O)}}function y(x,v,_,C){C<0&&x.x===1&&(r[v]=x.x-1),_.x===0&&_.z===0&&(r[v]=C/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function f(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oa(e.vertices,e.indices,e.radius,e.details)}}class ns extends oa{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ns(e.radius,e.detail)}}const i0={triangulate:function(o,e,t=2){const n=e&&e.length,i=n?e[0]*t:o.length;let s=Qc(o,0,i,t,!0);const r=[];if(!s||s.next===s.prev)return r;let a,l,c,h,d,u,p;if(n&&(s=l0(o,e,s,t)),o.length>80*t){a=c=o[0],l=h=o[1];for(let g=t;g<i;g+=t)d=o[g],u=o[g+1],d<a&&(a=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);p=Math.max(c-a,h-l),p=p!==0?32767/p:0}return Ms(s,r,t,a,l,p,0),r}};function Qc(o,e,t,n,i){let s,r;if(i===x0(o,e,t,n)>0)for(s=e;s<t;s+=n)r=Ql(s,o[s],o[s+1],r);else for(s=t-n;s>=e;s-=n)r=Ql(s,o[s],o[s+1],r);return r&&Lr(r,r.next)&&(ws(r),r=r.next),r}function gi(o,e){if(!o)return o;e||(e=o);let t=o,n;do if(n=!1,!t.steiner&&(Lr(t,t.next)||dt(t.prev,t,t.next)===0)){if(ws(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ms(o,e,t,n,i,s,r){if(!o)return;!r&&s&&p0(o,n,i,s);let a=o,l,c;for(;o.prev!==o.next;){if(l=o.prev,c=o.next,s?r0(o,n,i,s):s0(o)){e.push(l.i/t|0),e.push(o.i/t|0),e.push(c.i/t|0),ws(o),o=c.next,a=c.next;continue}if(o=c,o===a){r?r===1?(o=o0(gi(o),e,t),Ms(o,e,t,n,i,s,2)):r===2&&a0(o,e,t,n,i,s):Ms(gi(o),e,t,n,i,s,1);break}}}function s0(o){const e=o.prev,t=o,n=o.next;if(dt(e,t,n)>=0)return!1;const i=e.x,s=t.x,r=n.x,a=e.y,l=t.y,c=n.y,h=i<s?i<r?i:r:s<r?s:r,d=a<l?a<c?a:c:l<c?l:c,u=i>s?i>r?i:r:s>r?s:r,p=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=p&&Vi(i,a,s,l,r,c,g.x,g.y)&&dt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function r0(o,e,t,n){const i=o.prev,s=o,r=o.next;if(dt(i,s,r)>=0)return!1;const a=i.x,l=s.x,c=r.x,h=i.y,d=s.y,u=r.y,p=a<l?a<c?a:c:l<c?l:c,g=h<d?h<u?h:u:d<u?d:u,y=a>l?a>c?a:c:l>c?l:c,m=h>d?h>u?h:u:d>u?d:u,f=Oo(p,g,e,t,n),x=Oo(y,m,e,t,n);let v=o.prevZ,_=o.nextZ;for(;v&&v.z>=f&&_&&_.z<=x;){if(v.x>=p&&v.x<=y&&v.y>=g&&v.y<=m&&v!==i&&v!==r&&Vi(a,h,l,d,c,u,v.x,v.y)&&dt(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=p&&_.x<=y&&_.y>=g&&_.y<=m&&_!==i&&_!==r&&Vi(a,h,l,d,c,u,_.x,_.y)&&dt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=f;){if(v.x>=p&&v.x<=y&&v.y>=g&&v.y<=m&&v!==i&&v!==r&&Vi(a,h,l,d,c,u,v.x,v.y)&&dt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=x;){if(_.x>=p&&_.x<=y&&_.y>=g&&_.y<=m&&_!==i&&_!==r&&Vi(a,h,l,d,c,u,_.x,_.y)&&dt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function o0(o,e,t){let n=o;do{const i=n.prev,s=n.next.next;!Lr(i,s)&&eh(i,n,n.next,s)&&Ss(i,s)&&Ss(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),ws(n),ws(n.next),n=o=s),n=n.next}while(n!==o);return gi(n)}function a0(o,e,t,n,i,s){let r=o;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&g0(r,a)){let l=th(r,a);r=gi(r,r.next),l=gi(l,l.next),Ms(r,e,t,n,i,s,0),Ms(l,e,t,n,i,s,0);return}a=a.next}r=r.next}while(r!==o)}function l0(o,e,t,n){const i=[];let s,r,a,l,c;for(s=0,r=e.length;s<r;s++)a=e[s]*n,l=s<r-1?e[s+1]*n:o.length,c=Qc(o,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(m0(c));for(i.sort(c0),s=0;s<i.length;s++)t=h0(i[s],t);return t}function c0(o,e){return o.x-e.x}function h0(o,e){const t=d0(o,e);if(!t)return e;const n=th(t,o);return gi(n,n.next),gi(t,t.next)}function d0(o,e){let t=e,n=-1/0,i;const s=o.x,r=o.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=s&&u>n&&(n=u,i=t.x<t.next.x?t:t.next,u===s))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,d;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&Vi(r<c?s:n,r,l,c,r<c?n:s,r,t.x,t.y)&&(d=Math.abs(r-t.y)/(s-t.x),Ss(t,o)&&(d<h||d===h&&(t.x>i.x||t.x===i.x&&u0(i,t)))&&(i=t,h=d)),t=t.next;while(t!==a);return i}function u0(o,e){return dt(o.prev,o,e.prev)<0&&dt(e.next,o,o.next)<0}function p0(o,e,t,n){let i=o;do i.z===0&&(i.z=Oo(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==o);i.prevZ.nextZ=null,i.prevZ=null,f0(i)}function f0(o){let e,t,n,i,s,r,a,l,c=1;do{for(t=o,o=null,s=null,r=0;t;){for(r++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:o=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(r>1);return o}function Oo(o,e,t,n,i){return o=(o-t)*i|0,e=(e-n)*i|0,o=(o|o<<8)&16711935,o=(o|o<<4)&252645135,o=(o|o<<2)&858993459,o=(o|o<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,o|e<<1}function m0(o){let e=o,t=o;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==o);return t}function Vi(o,e,t,n,i,s,r,a){return(i-r)*(e-a)>=(o-r)*(s-a)&&(o-r)*(n-a)>=(t-r)*(e-a)&&(t-r)*(s-a)>=(i-r)*(n-a)}function g0(o,e){return o.next.i!==e.i&&o.prev.i!==e.i&&!y0(o,e)&&(Ss(o,e)&&Ss(e,o)&&v0(o,e)&&(dt(o.prev,o,e.prev)||dt(o,e.prev,e))||Lr(o,e)&&dt(o.prev,o,o.next)>0&&dt(e.prev,e,e.next)>0)}function dt(o,e,t){return(e.y-o.y)*(t.x-e.x)-(e.x-o.x)*(t.y-e.y)}function Lr(o,e){return o.x===e.x&&o.y===e.y}function eh(o,e,t,n){const i=lr(dt(o,e,t)),s=lr(dt(o,e,n)),r=lr(dt(t,n,o)),a=lr(dt(t,n,e));return!!(i!==s&&r!==a||i===0&&ar(o,t,e)||s===0&&ar(o,n,e)||r===0&&ar(t,o,n)||a===0&&ar(t,e,n))}function ar(o,e,t){return e.x<=Math.max(o.x,t.x)&&e.x>=Math.min(o.x,t.x)&&e.y<=Math.max(o.y,t.y)&&e.y>=Math.min(o.y,t.y)}function lr(o){return o>0?1:o<0?-1:0}function y0(o,e){let t=o;do{if(t.i!==o.i&&t.next.i!==o.i&&t.i!==e.i&&t.next.i!==e.i&&eh(t,t.next,o,e))return!0;t=t.next}while(t!==o);return!1}function Ss(o,e){return dt(o.prev,o,o.next)<0?dt(o,e,o.next)>=0&&dt(o,o.prev,e)>=0:dt(o,e,o.prev)<0||dt(o,o.next,e)<0}function v0(o,e){let t=o,n=!1;const i=(o.x+e.x)/2,s=(o.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==o);return n}function th(o,e){const t=new zo(o.i,o.x,o.y),n=new zo(e.i,e.x,e.y),i=o.next,s=e.prev;return o.next=e,e.prev=o,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Ql(o,e,t,n){const i=new zo(o,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ws(o){o.next.prev=o.prev,o.prev.next=o.next,o.prevZ&&(o.prevZ.nextZ=o.nextZ),o.nextZ&&(o.nextZ.prevZ=o.prevZ)}function zo(o,e,t){this.i=o,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function x0(o,e,t,n){let i=0;for(let s=e,r=t-n;s<t;s+=n)i+=(o[r]-o[s])*(o[s+1]+o[r+1]),r=s;return i}class aa{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return aa.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];ec(e),tc(n,e);let r=e.length;t.forEach(ec);for(let l=0;l<t.length;l++)i.push(r),r+=t[l].length,tc(n,t[l]);const a=i0.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function ec(o){const e=o.length;e>2&&o[e-1].equals(o[0])&&o.pop()}function tc(o,e){for(let t=0;t<e.length;t++)o.push(e[t].x),o.push(e[t].y)}class la extends mt{constructor(e=.5,t=1,n=32,i=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let d=e;const u=(t-e)/i,p=new T,g=new Ee;for(let y=0;y<=i;y++){for(let m=0;m<=n;m++){const f=s+m/n*r;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let y=0;y<i;y++){const m=y*(n+1);for(let f=0;f<n;f++){const x=f+m,v=x,_=x+n+1,C=x+n+2,A=x+1;a.push(v,_,A),a.push(_,C,A)}}this.setIndex(a),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(c,3)),this.setAttribute("uv",new Ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new la(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class qt extends mt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const h=[],d=new T,u=new T,p=[],g=[],y=[],m=[];for(let f=0;f<=n;f++){const x=[],v=f/n;let _=0;f===0&&r===0?_=.5/t:f===n&&l===Math.PI&&(_=-.5/t);for(let C=0;C<=t;C++){const A=C/t;d.x=-e*Math.cos(i+A*s)*Math.sin(r+v*a),d.y=e*Math.cos(r+v*a),d.z=e*Math.sin(i+A*s)*Math.sin(r+v*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(A+_,1-v),x.push(c++)}h.push(x)}for(let f=0;f<n;f++)for(let x=0;x<t;x++){const v=h[f][x+1],_=h[f][x],C=h[f+1][x],A=h[f+1][x+1];(f!==0||r>0)&&p.push(v,_,A),(f!==n-1||l<Math.PI)&&p.push(_,C,A)}this.setIndex(p),this.setAttribute("position",new Ke(g,3)),this.setAttribute("normal",new Ke(y,3)),this.setAttribute("uv",new Ke(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class nc extends mt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new T,s=new T;if(e.index!==null){const r=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const d=l[c],u=d.start,p=d.count;for(let g=u,y=u+p;g<y;g+=3)for(let m=0;m<3;m++){const f=a.getX(g+m),x=a.getX(g+(m+1)%3);i.fromBufferAttribute(r,f),s.fromBufferAttribute(r,x),ic(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const r=e.attributes.position;for(let a=0,l=r.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,d=3*a+(c+1)%3;i.fromBufferAttribute(r,h),s.fromBufferAttribute(r,d),ic(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ke(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function ic(o,e,t){const n=`${o.x},${o.y},${o.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${o.x},${o.y},${o.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}class Is extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Un extends Is{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return At(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Gt extends an{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ce(16777215),this.specular=new ce(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class We extends an{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function cr(o,e,t){return!o||!t&&o.constructor===e?o:typeof e.BYTES_PER_ELEMENT=="number"?new e(o):Array.prototype.slice.call(o)}function _0(o){return ArrayBuffer.isView(o)&&!(o instanceof DataView)}function b0(o){function e(i,s){return o[i]-o[s]}const t=o.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function sc(o,e,t){const n=o.length,i=new o.constructor(n);for(let s=0,r=0;r!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[r++]=o[a+l]}return i}function nh(o,e,t,n){let i=1,s=o[0];for(;s!==void 0&&s[n]===void 0;)s=o[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push.apply(t,r)),s=o[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=o[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=o[i++];while(s!==void 0)}class Cs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let r;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}r=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}r=n,n=0;break n}break e}for(;n<r;){const a=n+r>>>1;e<t[a]?r=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class M0 extends Cs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Oi,endingEnd:Oi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,r=e+1,a=i[s],l=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case zi:s=e,a=2*t-n;break;case gr:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case zi:r=e,l=2*n-t;break;case gr:r=1,l=n+i[1]-i[0];break;default:r=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),y=g*g,m=y*g,f=-u*m+2*u*y-u*g,x=(1+u)*m+(-1.5-2*u)*y+(-.5+u)*g+1,v=(-1-p)*m+(1.5+p)*y+.5*g,_=p*m-p*y;for(let C=0;C!==a;++C)s[C]=f*r[h+C]+x*r[c+C]+v*r[l+C]+_*r[d+C];return s}}class ih extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==a;++u)s[u]=r[c+u]*d+r[l+u]*h;return s}}class S0 extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class _n{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=cr(t,this.TimeBufferType),this.values=cr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:cr(e.times,Array),values:cr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new S0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ih(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new M0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case xs:t=this.InterpolantFactoryMethodDiscrete;break;case Zi:t=this.InterpolantFactoryMethodLinear;break;case Wr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xs;case this.InterpolantFactoryMethodLinear:return Zi;case this.InterpolantFactoryMethodSmooth:return Wr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);const a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,r),e=!1;break}r=l}if(i!==void 0&&_0(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Wr,s=e.length-1;let r=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,u=d-n,p=d+n;for(let g=0;g!==n;++g){const y=t[d+g];if(y!==t[u+g]||y!==t[p+g]){l=!0;break}}}if(l){if(a!==r){e[r]=e[a];const d=a*n,u=r*n;for(let p=0;p!==n;++p)t[u+p]=t[d+p]}++r}}if(s>0){e[r]=e[s];for(let a=s*n,l=r*n,c=0;c!==n;++c)t[l+c]=t[a+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=Zi;class is extends _n{}is.prototype.ValueTypeName="bool";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=xs;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;class sh extends _n{}sh.prototype.ValueTypeName="color";class yi extends _n{}yi.prototype.ValueTypeName="number";class w0 extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)ht.slerpFlat(s,0,r,c-a,r,c,l);return s}}class Fn extends _n{InterpolantFactoryMethodLinear(e){return new w0(this.times,this.values,this.getValueSize(),e)}}Fn.prototype.ValueTypeName="quaternion";Fn.prototype.DefaultInterpolation=Zi;Fn.prototype.InterpolantFactoryMethodSmooth=void 0;class ss extends _n{}ss.prototype.ValueTypeName="string";ss.prototype.ValueBufferType=Array;ss.prototype.DefaultInterpolation=xs;ss.prototype.InterpolantFactoryMethodLinear=void 0;ss.prototype.InterpolantFactoryMethodSmooth=void 0;class vi extends _n{}vi.prototype.ValueTypeName="vector";class Sr{constructor(e,t=-1,n,i=Ko){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=mn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,a=n.length;r!==a;++r)t.push(T0(n[r]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,r=n.length;s!==r;++s)t.push(_n.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,r=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=b0(l);l=sc(l,1,h),c=sc(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),r.push(new yi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const d=h[1];let u=i[d];u||(i[d]=u=[]),u.push(c)}}const r=[];for(const a in i)r.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return r}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,u,p,g,y){if(p.length!==0){const m=[],f=[];nh(p,m,f,g),m.length!==0&&y.push(new d(u,m,f))}},i=[],s=e.name||"default",r=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const p={};let g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let y=0;y<u[g].morphTargets.length;y++)p[u[g].morphTargets[y]]=-1;for(const y in p){const m=[],f=[];for(let x=0;x!==u[g].morphTargets.length;++x){const v=u[g];m.push(v.time),f.push(v.morphTarget===y?1:0)}i.push(new yi(".morphTargetInfluence["+y+"]",m,f))}l=p.length*r}else{const p=".bones["+t[d].name+"]";n(vi,p+".position",u,"pos",i),n(Fn,p+".quaternion",u,"rot",i),n(vi,p+".scale",u,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function E0(o){switch(o.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yi;case"vector":case"vector2":case"vector3":case"vector4":return vi;case"color":return sh;case"quaternion":return Fn;case"bool":case"boolean":return is;case"string":return ss}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+o)}function T0(o){if(o.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=E0(o.type);if(o.times===void 0){const t=[],n=[];nh(o.keys,t,n,"value"),o.times=t,o.values=n}return e.parse!==void 0?e.parse(o):new e(o.name,o.times,o.values,o.interpolation)}const jn={enabled:!1,files:{},add:function(o,e){this.enabled!==!1&&(this.files[o]=e)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class A0{constructor(e,t,n){const i=this;let s=!1,r=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,r,a),s=!0},this.itemEnd=function(h){r++,i.onProgress!==void 0&&i.onProgress(h,r,a),r===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const I0=new A0;class Bn{constructor(e){this.manager=e!==void 0?e:I0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Bn.DEFAULT_MATERIAL_NAME="__DEFAULT";const An={};class C0 extends Error{constructor(e,t){super(e),this.response=t}}class ca extends Bn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=jn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(An[e]!==void 0){An[e].push({onLoad:t,onProgress:n,onError:i});return}An[e]=[],An[e].push({onLoad:t,onProgress:n,onError:i});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=An[e],d=c.body.getReader(),u=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=u?parseInt(u):0,g=p!==0;let y=0;const m=new ReadableStream({start(f){x();function x(){d.read().then(({done:v,value:_})=>{if(v)f.close();else{y+=_.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:p});for(let A=0,I=h.length;A<I;A++){const L=h[A];L.onProgress&&L.onProgress(C)}f.enqueue(_),x()}})}}});return new Response(m)}else throw new C0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,p=new TextDecoder(u);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{jn.add(e,c);const h=An[e];delete An[e];for(let d=0,u=h.length;d<u;d++){const p=h[d];p.onLoad&&p.onLoad(c)}}).catch(c=>{const h=An[e];if(h===void 0)throw this.manager.itemError(e),c;delete An[e];for(let d=0,u=h.length;d<u;d++){const p=h[d];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class R0 extends Bn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=jn.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const a=_s("img");function l(){h(),jn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){h(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class rh extends Bn{constructor(e){super(e)}load(e,t,n,i){const s=new xt,r=new R0(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Dr extends rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const vo=new ue,rc=new T,oc=new T;class ha{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ta,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;rc.setFromMatrixPosition(e.matrixWorld),t.position.copy(rc),oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(oc),t.updateMatrixWorld(),vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class P0 extends ha{constructor(){super(new _t(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ji*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class oh extends Dr{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new P0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ac=new ue,us=new T,xo=new T;class L0 extends ha{constructor(){super(new _t(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new Ye(2,1,1,1),new Ye(0,1,1,1),new Ye(3,1,1,1),new Ye(1,1,1,1),new Ye(3,0,1,1),new Ye(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),us.setFromMatrixPosition(e.matrixWorld),n.position.copy(us),xo.copy(n.position),xo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(xo),n.updateMatrixWorld(),i.makeTranslation(-us.x,-us.y,-us.z),ac.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ac)}}class Ho extends Dr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new L0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class D0 extends ha{constructor(){super(new Ir(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xi extends Dr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.shadow=new D0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Rs extends Dr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Xi{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class F0 extends Bn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=jn.get(e);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return jn.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),jn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});jn.add(e,l),s.manager.itemStart(e)}}class B0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=lc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=lc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function lc(){return(typeof performance>"u"?Date:performance).now()}class U0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,r;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,r=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,r=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,r=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=r,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let r=this.cumulativeWeight;if(r===0){for(let a=0;a!==i;++a)n[s+a]=n[a];r=t}else{r+=t;const a=t/r;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=r}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}r>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,r=i;s!==r;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let r=0;r!==s;++r)e[t+r]=e[n+r]}_slerp(e,t,n,i){ht.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const r=this._workIndex*s;ht.multiplyQuaternionsFlat(e,r,e,t,e,n),ht.slerpFlat(e,t,e,t,e,r,i)}_lerp(e,t,n,i,s){const r=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*r+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let r=0;r!==s;++r){const a=t+r;e[a]=e[a]+e[n+r]*i}}}const da="\\[\\]\\.:\\/",k0=new RegExp("["+da+"]","g"),ua="[^"+da+"]",N0="[^"+da.replace("\\.","")+"]",O0=/((?:WC+[\/:])*)/.source.replace("WC",ua),z0=/(WCOD+)?/.source.replace("WCOD",N0),H0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ua),G0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ua),V0=new RegExp("^"+O0+z0+H0+G0+"$"),W0=["material","materials","bones","map"];class $0{constructor(e,t,n){const i=n||Xe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Xe{constructor(e,t,n){this.path=t,this.parsedPath=n||Xe.parseTrackName(t),this.node=Xe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Xe.Composite(e,t,n):new Xe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(k0,"")}static parseTrackName(e){const t=V0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);W0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let r=0;r<s.length;r++){const a=s[r];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Xe.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[i];if(r===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Xe.Composite=$0;Xe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Xe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Xe.prototype.GetterByBindingType=[Xe.prototype._getValue_direct,Xe.prototype._getValue_array,Xe.prototype._getValue_arrayElement,Xe.prototype._getValue_toArray];Xe.prototype.SetterByBindingTypeAndVersioning=[[Xe.prototype._setValue_direct,Xe.prototype._setValue_direct_setNeedsUpdate,Xe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_array,Xe.prototype._setValue_array_setNeedsUpdate,Xe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_arrayElement,Xe.prototype._setValue_arrayElement_setNeedsUpdate,Xe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_fromArray,Xe.prototype._setValue_fromArray_setNeedsUpdate,Xe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class X0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,r=s.length,a=new Array(r),l={endingStart:Oi,endingEnd:Oi};for(let c=0;c!==r;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Pc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,r=s/i,a=i/s;e.warp(1,r,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,r=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/r,c[1]=t/r,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const r=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case md:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(r),c[h].accumulateAdditive(a);break;case Ko:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(r),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const r=n===fd;if(e===0)return s===-1?i:r&&(s&1)===1?t-i:i;if(n===Po){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,r)):this._setEndings(this.repetitions===0,!0,r)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,r)}else this._setEndings(!1,!1,r);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(r&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=zi,i.endingEnd=zi):(e?i.endingStart=this.zeroSlopeAtStart?zi:Oi:i.endingStart=gr,t?i.endingEnd=this.zeroSlopeAtEnd?zi:Oi:i.endingEnd=gr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let r=this._weightInterpolant;r===null&&(r=i._lendControlInterpolant(),this._weightInterpolant=r);const a=r.parameterPositions,l=r.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const j0=new Float32Array(1);class ah extends _i{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,r=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==s;++d){const u=i[d],p=u.name;let g=h[p];if(g!==void 0)++g.referenceCount,r[d]=g;else{if(g=r[d],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,p));continue}const y=t&&t._propertyBindings[d].binding.parsedPath;g=new U0(Xe.create(n,p,y),u.ValueTypeName,u.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,p),r[d]=g}a[d].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let r=s[t];if(r===void 0)r={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=r;else{const a=r.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),r.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,r=this._actionsByClip,a=r[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const d=a.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete r[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let r=i[t];r===void 0&&(r={},i[t]=r),r[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,r=this._bindingsByRootAndName,a=r[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete r[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new ih(new Float32Array(2),new Float32Array(2),1,j0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let r=typeof e=="string"?Sr.findByName(i,e):e;const a=r!==null?r.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(r!==null?n=r.blendMode:n=Ko),l!==void 0){const d=l.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],r===null&&(r=c._clip)}if(r===null)return null;const h=new X0(this,r,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Sr.findByName(n,e):e,r=s?s.uuid:e,a=this._actionsByClip[r];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),r=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,r);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(r);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const r=s.knownActions;for(let a=0,l=r.length;a!==l;++a){const c=r[a];this._deactivateAction(c);const h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const r in n){const a=n[r].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const r in s){const a=s[r];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Fr{constructor(e,t,n=0,i=1/0){this.ray=new Es(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Qo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Go(e,this,n,t),n.sort(cc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Go(e[i],this,n,t);return n.sort(cc),n}}function cc(o,e){return o.distance-e.distance}function Go(o,e,t,n){if(o.layers.test(e.layers)&&o.raycast(e,t),n===!0){const i=o.children;for(let s=0,r=i.length;s<r;s++)Go(i[s],e,t,!0)}}class q0 extends bs{constructor(e=10,t=10,n=4473924,i=8947848){n=new ce(n),i=new ce(i);const s=t/2,r=e/t,a=e/2,l=[],c=[];for(let u=0,p=0,g=-a;u<=t;u++,g+=r){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const y=u===s?n:i;y.toArray(c,p),p+=3,y.toArray(c,p),p+=3,y.toArray(c,p),p+=3,y.toArray(c,p),p+=3}const h=new mt;h.setAttribute("position",new Ke(l,3)),h.setAttribute("color",new Ke(c,3));const d=new Ln({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Y0 extends bs{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new mt;s.setIndex(new Ft(n,1)),s.setAttribute("position",new Ke(i,3)),super(s,new Ln({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jo);class K0{constructor(e,t,n){this.character=e,this.camera=t,this.renderer=n,this.moveSpeed=5,this.runSpeed=10,this.rotationSpeed=12,this.gravity=25,this.velocity=new T,this.isGrounded=!1,this.isRunning=!1,this.collisionSystem=null,this.colliderOffset=0,this.keys={},this.mouseInput={x:0,y:0},this.isMouseDown=!1,this.cameraDistance=8,this.cameraHeight=4,this.cameraAngleH=0,this.cameraAngleV=.3,this.mouseSensitivity=.003,this.cameraCollisionRadius=.5,this.minCameraDistance=1.5,this.cameraRaycaster=new Fr,this.setupInput()}setCollisionSystem(e){this.collisionSystem=e}setupInput(){document.addEventListener("keydown",t=>{this.keys[t.code]=!0}),document.addEventListener("keyup",t=>{this.keys[t.code]=!1}),this.renderer.domElement.addEventListener("mousedown",t=>{this.isMouseDown=!0,this.mouseInput.x=t.clientX,this.mouseInput.y=t.clientY}),document.addEventListener("mouseup",()=>{this.isMouseDown=!1}),document.addEventListener("mousemove",t=>{if(!this.isMouseDown)return;const n=t.clientX-this.mouseInput.x,i=t.clientY-this.mouseInput.y;this.cameraAngleH-=n*this.mouseSensitivity,this.cameraAngleV+=i*this.mouseSensitivity,this.cameraAngleV=Math.max(-Math.PI/3,Math.min(Math.PI/3,this.cameraAngleV)),this.mouseInput.x=t.clientX,this.mouseInput.y=t.clientY});let e=null;this.renderer.domElement.addEventListener("touchstart",t=>{t.touches.length===1&&(e={x:t.touches[0].clientX,y:t.touches[0].clientY})}),this.renderer.domElement.addEventListener("touchmove",t=>{if(t.touches.length===1&&e){t.preventDefault();const n=t.touches[0],i=n.clientX-e.x,s=n.clientY-e.y;this.cameraAngleH-=i*this.mouseSensitivity*2,this.cameraAngleV+=s*this.mouseSensitivity*2,this.cameraAngleV=Math.max(-Math.PI/3,Math.min(Math.PI/3,this.cameraAngleV)),e={x:n.clientX,y:n.clientY}}}),this.renderer.domElement.addEventListener("touchend",()=>{e=null})}update(e){this.handleInput(e),this.updatePhysics(e),this.updateCamera(),this.handleCameraCollision()}handleInput(e){this.isRunning=this.keys.ShiftLeft||this.keys.ShiftRight;const t=new T;if(this.keys.KeyW&&(t.z-=1),this.keys.KeyS&&(t.z+=1),this.keys.KeyA&&(t.x-=1),this.keys.KeyD&&(t.x+=1),t.lengthSq()>0){t.normalize(),t.applyAxisAngle(new T(0,1,0),this.cameraAngleH);const n=this.isRunning?this.runSpeed:this.moveSpeed;this.velocity.x=t.x*n,this.velocity.z=t.z*n;const i=Math.atan2(t.x,t.z),s=this.character.rotation.y,r=i-s,a=Math.atan2(Math.sin(r),Math.cos(r));this.character.rotation.y+=a*this.rotationSpeed*e}else this.velocity.x=0,this.velocity.z=0}updatePhysics(e){this.isGrounded?this.velocity.y<0&&(this.velocity.y=0):this.velocity.y-=this.gravity*e;const t=new T(this.velocity.x*e,0,this.velocity.z*e);if(this.collisionSystem&&t.lengthSq()>0){const n=this.collisionSystem.checkHorizontalCollision(this.character.position,t,.5);n.hasCollision?this.character.position.copy(n.correctedPosition):this.character.position.add(t)}else this.character.position.add(t);if(this.character.position.y+=this.velocity.y*e,this.collisionSystem){const n=this.collisionSystem.checkGroundCollision(this.character.position,2,.1);n.hasCollision?this.character.position.y-this.colliderOffset-n.groundHeight<=.1&&this.velocity.y<=0?(this.character.position.y=n.groundHeight+this.colliderOffset,this.velocity.y=0,this.isGrounded=!0):this.isGrounded=!1:this.isGrounded=!1}else this.isGrounded=!1}updateCamera(){const e=this.character.position.clone(),t=this.cameraDistance*Math.cos(this.cameraAngleV),n=this.cameraHeight+this.cameraDistance*Math.sin(this.cameraAngleV),i=new T(Math.sin(this.cameraAngleH)*t,n,Math.cos(this.cameraAngleH)*t);this.camera.position.copy(e).add(i);const s=e.clone();s.y+=1.5,this.camera.lookAt(s)}handleCameraCollision(){if(!this.collisionSystem||!this.collisionSystem.colliders||!Array.isArray(this.collisionSystem.colliders)||this.collisionSystem.colliders.length===0)return;const e=[];for(const a of this.collisionSystem.colliders)a&&a.mesh&&a.mesh.traverse(l=>{const c=l;c.isMesh&&c.geometry&&c.layers!==void 0&&e.push(c)});if(e.length===0)return;const t=this.character.position.clone(),n=this.camera.position.clone(),i=n.clone().sub(t).normalize(),s=t.distanceTo(n);this.cameraRaycaster.set(t,i);const r=this.cameraRaycaster.intersectObjects(e,!1);if(r.length>0){const l=r[0].distance;if(l<s){const c=Math.max(l-this.cameraCollisionRadius,this.minCameraDistance),h=t.clone().add(i.multiplyScalar(c));this.camera.position.copy(h);const d=t.clone();d.y+=1.5,this.camera.lookAt(d)}}}getMovementState(){return Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.z*this.velocity.z)<.1?"idle":this.isRunning?"running":"walking"}destroy(){}}function hc(o,e){if(e===gd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===Lo||e===Lc){let t=o.getIndex();if(t===null){const r=[],a=o.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)r.push(l);o.setIndex(r),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const n=t.count-2,i=[];if(e===Lo)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=o.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}class Cn extends Bn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ty(t)}),this.register(function(t){return new hy(t)}),this.register(function(t){return new dy(t)}),this.register(function(t){return new uy(t)}),this.register(function(t){return new iy(t)}),this.register(function(t){return new sy(t)}),this.register(function(t){return new ry(t)}),this.register(function(t){return new oy(t)}),this.register(function(t){return new ey(t)}),this.register(function(t){return new ay(t)}),this.register(function(t){return new ny(t)}),this.register(function(t){return new cy(t)}),this.register(function(t){return new ly(t)}),this.register(function(t){return new J0(t)}),this.register(function(t){return new py(t)}),this.register(function(t){return new fy(t)})}load(e,t,n,i){const s=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=Xi.extractUrlBase(e);r=Xi.resolveURL(c,this.path)}else r=Xi.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ca(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const r={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===lh){try{r[$e.KHR_BINARY_GLTF]=new my(e)}catch(d){i&&i(d);return}s=JSON.parse(r[$e.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Iy(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,r[d.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const d=s.extensionsUsed[h],u=s.extensionsRequired||[];switch(d){case $e.KHR_MATERIALS_UNLIT:r[d]=new Q0;break;case $e.KHR_DRACO_MESH_COMPRESSION:r[d]=new gy(s,this.dracoLoader);break;case $e.KHR_TEXTURE_TRANSFORM:r[d]=new yy;break;case $e.KHR_MESH_QUANTIZATION:r[d]=new vy;break;default:u.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(r),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Z0(){let o={};return{get:function(e){return o[e]},add:function(e,t){o[e]=t},remove:function(e){delete o[e]},removeAll:function(){o={}}}}const $e={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class J0{constructor(e){this.parser=e,this.name=$e.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new ce(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],It);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new xi(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ho(h),c.distance=d;break;case"spot":c=new oh(h),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,$n(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Q0{constructor(){this.name=$e.KHR_MATERIALS_UNLIT}getMaterialType(){return Xt}extendParams(e,t,n){const i=[];e.color=new ce(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],It),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,tt))}return Promise.all(i)}}class ey{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class ty{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const a=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ee(a,a)}return Promise.all(s)}}class ny{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}}class iy{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new ce(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){const a=r.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],It)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,tt)),r.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}}class sy{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}}class ry{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const a=r.attenuationColor||[1,1,1];return t.attenuationColor=new ce().setRGB(a[0],a[1],a[2],It),Promise.all(s)}}class oy{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class ay{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));const a=r.specularColorFactor||[1,1,1];return t.specularColor=new ce().setRGB(a[0],a[1],a[2],It),r.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,tt)),Promise.all(s)}}class ly{constructor(e){this.parser=e,this.name=$e.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(s)}}class cy{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(s)}}class hy{constructor(e){this.parser=e,this.name=$e.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}}class dy{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],a=i.images[r.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class uy{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],a=i.images[r.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class py{constructor(e){this.name=$e.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,d=i.byteStride,u=new Uint8Array(a,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,d,u,i.mode,i.filter).then(function(p){return p.buffer}):r.ready.then(function(){const p=new ArrayBuffer(h*d);return r.decodeGltfBuffer(new Uint8Array(p),h,d,u,i.mode,i.filter),p})})}else return null}}class fy{constructor(e){this.name=$e.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==tn.TRIANGLES&&c.mode!==tn.TRIANGLE_STRIP&&c.mode!==tn.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=n.extensions[this.name].attributes,a=[],l={};for(const c in r)a.push(this.parser.getDependency("accessor",r[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),d=h.isGroup?h.children:[h],u=c[0].count,p=[];for(const g of d){const y=new ue,m=new T,f=new ht,x=new T(1,1,1),v=new Qg(g.geometry,g.material,u);for(let _=0;_<u;_++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,_),l.SCALE&&x.fromBufferAttribute(l.SCALE,_),v.setMatrixAt(_,y.compose(m,f,x));for(const _ in l)if(_==="_COLOR_0"){const C=l[_];v.instanceColor=new ko(C.array,C.itemSize,C.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,l[_]);rt.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),p.push(v)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const lh="glTF",ps=12,dc={JSON:1313821514,BIN:5130562};class my{constructor(e){this.name=$e.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ps),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==lh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ps,s=new DataView(e,ps);let r=0;for(;r<i;){const a=s.getUint32(r,!0);r+=4;const l=s.getUint32(r,!0);if(r+=4,l===dc.JSON){const c=new Uint8Array(e,ps+r,a);this.content=n.decode(c)}else if(l===dc.BIN){const c=ps+r;this.body=e.slice(c,c+a)}r+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class gy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$e.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,a={},l={},c={};for(const h in r){const d=Vo[h]||h.toLowerCase();a[d]=r[h]}for(const h in e.attributes){const d=Vo[h]||h.toLowerCase();if(r[h]!==void 0){const u=n.accessors[e.attributes[h]],p=ji[u.componentType];c[d]=p.name,l[d]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(d,u){i.decodeDracoFile(h,function(p){for(const g in p.attributes){const y=p.attributes[g],m=l[g];m!==void 0&&(y.normalized=m)}d(p)},a,c,It,u)})})}}class yy{constructor(){this.name=$e.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class vy{constructor(){this.name=$e.KHR_MESH_QUANTIZATION}}class ch extends Cs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,d=(n-t)/h,u=d*d,p=u*d,g=e*c,y=g-c,m=-2*p+3*u,f=p-u,x=1-m,v=f-u+d;for(let _=0;_!==a;_++){const C=r[y+_+a],A=r[y+_+l]*h,I=r[g+_+a],L=r[g+_]*h;s[_]=x*C+v*A+m*I+f*L}return s}}const xy=new ht;class _y extends ch{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return xy.fromArray(s).normalize().toArray(s),s}}const tn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ji={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},uc={9728:Tt,9729:Vt,9984:Ro,9985:Sc,9986:dr,9987:pi},pc={33071:$t,33648:mr,10497:Jn},_o={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Vo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Gn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},by={CUBICSPLINE:void 0,LINEAR:Zi,STEP:xs},bo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function My(o){return o.DefaultMaterial===void 0&&(o.DefaultMaterial=new Is({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Dn})),o.DefaultMaterial}function ri(o,e,t){for(const n in t.extensions)o[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function $n(o,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(o.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Sy(o,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(o);const r=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const d=e[c];if(n){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):o.attributes.position;r.push(u)}if(i){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):o.attributes.normal;a.push(u)}if(s){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):o.attributes.color;l.push(u)}}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],d=c[1],u=c[2];return n&&(o.morphAttributes.position=h),i&&(o.morphAttributes.normal=d),s&&(o.morphAttributes.color=u),o.morphTargetsRelative=!0,o})}function wy(o,e){if(o.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)o.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(o.morphTargetInfluences.length===t.length){o.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)o.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ey(o){let e;const t=o.extensions&&o.extensions[$e.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Mo(t.attributes):e=o.indices+":"+Mo(o.attributes)+":"+o.mode,o.targets!==void 0)for(let n=0,i=o.targets.length;n<i;n++)e+=":"+Mo(o.targets[n]);return e}function Mo(o){let e="";const t=Object.keys(o).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+o[t[n]]+";";return e}function Wo(o){switch(o){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ty(o){return o.search(/\.jpe?g($|\?)/i)>0||o.search(/^data\:image\/jpeg/)===0?"image/jpeg":o.search(/\.webp($|\?)/i)>0||o.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Ay=new ue;class Iy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Z0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new rh(this.options.manager):this.textureLoader=new F0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ca(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){const a={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return ri(s,a,i),$n(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i].joints;for(let a=0,l=r.length;a<l;a++)e[r[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(r,a)=>{const l=this.associations.get(r);l!=null&&this.associations.set(a,l);for(const[c,h]of r.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$e.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,r){n.load(Xi.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const r=_o[i.type],a=ji[i.componentType],l=i.normalized===!0,c=new a(i.count*r);return Promise.resolve(new Ft(c,r,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){const a=r[0],l=_o[i.type],c=ji[i.componentType],h=c.BYTES_PER_ELEMENT,d=h*l,u=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let y,m;if(p&&p!==d){const f=Math.floor(u/p),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count;let v=t.cache.get(x);v||(y=new c(a,f*p,i.count*p/h),v=new qg(y,p/h),t.cache.add(x,v)),m=new sa(v,l,u%p/h,g)}else a===null?y=new c(i.count*l):y=new c(a,u,i.count*l),m=new Ft(y,l,g);if(i.sparse!==void 0){const f=_o.SCALAR,x=ji[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,C=new x(r[1],v,i.sparse.count*f),A=new c(r[2],_,i.sparse.count*l);a!==null&&(m=new Ft(m.array.slice(),m.itemSize,m.normalized));for(let I=0,L=C.length;I<L;I++){const b=C[I];if(m.setX(b,A[I*l]),l>=2&&m.setY(b,A[I*l+1]),l>=3&&m.setZ(b,A[I*l+2]),l>=4&&m.setW(b,A[I*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s];let a=this.textureLoader;if(r.uri){const l=n.manager.getHandler(r.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,r=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const u=(s.samplers||{})[r.sampler]||{};return h.magFilter=uc[u.magFilter]||Vt,h.minFilter=uc[u.minFilter]||pi,h.wrapS=pc[u.wrapS]||Jn,h.wrapT=pc[u.wrapT]||Jn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const r=i.images[e],a=self.URL||self.webkitURL;let l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=n.getDependency("bufferView",r.bufferView).then(function(d){c=!0;const u=new Blob([d],{type:r.mimeType});return l=a.createObjectURL(u),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(d){return new Promise(function(u,p){let g=u;t.isImageBitmapLoader===!0&&(g=function(y){const m=new xt(y);m.needsUpdate=!0,u(m)}),t.load(Xi.resolveURL(d,s.path),g,void 0,p)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),d.userData.mimeType=r.mimeType||Ty(r.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[$e.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[$e.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(r);r=s.extensions[$e.KHR_TEXTURE_TRANSFORM].extendTexture(r,a),s.associations.set(r,l)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Jc,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Ln,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||r){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),r&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),r&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Is}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let r;const a={},l=s.extensions||{},c=[];if(l[$e.KHR_MATERIALS_UNLIT]){const d=i[$e.KHR_MATERIALS_UNLIT];r=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new ce(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],It),a.opacity=u[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,tt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),r=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=nn);const h=s.alphaMode||bo.OPAQUE;if(h===bo.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===bo.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==Xt&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ee(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&r!==Xt&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==Xt){const d=s.emissiveFactor;a.emissive=new ce().setRGB(d[0],d[1],d[2],It)}return s.emissiveTexture!==void 0&&r!==Xt&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,tt)),Promise.all(c).then(function(){const d=new r(a);return s.name&&(d.name=s.name),$n(d,s),t.associations.set(d,{materials:e}),s.extensions&&ri(i,d,s),d})}createUniqueName(e){const t=Xe.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[$e.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return fc(l,a,t)})}const r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Ey(c),d=i[h];if(d)r.push(d.promise);else{let u;c.extensions&&c.extensions[$e.KHR_DRACO_MESH_COMPRESSION]?u=s(c):u=fc(new mt,c,t),i[h]={primitive:c,promise:u},r.push(u)}}return Promise.all(r)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,a=[];for(let l=0,c=r.length;l<c;l++){const h=r[l].material===void 0?My(this.cache):this.getDependency("material",r[l].material);a.push(h)}return a.push(t.loadGeometries(r)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],d=[];for(let p=0,g=h.length;p<g;p++){const y=h[p],m=r[p];let f;const x=c[p];if(m.mode===tn.TRIANGLES||m.mode===tn.TRIANGLE_STRIP||m.mode===tn.TRIANGLE_FAN||m.mode===void 0)f=s.isSkinnedMesh===!0?new Zc(y,x):new Le(y,x),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===tn.TRIANGLE_STRIP?f.geometry=hc(f.geometry,Lc):m.mode===tn.TRIANGLE_FAN&&(f.geometry=hc(f.geometry,Lo));else if(m.mode===tn.LINES)f=new bs(y,x);else if(m.mode===tn.LINE_STRIP)f=new ts(y,x);else if(m.mode===tn.LINE_LOOP)f=new e0(y,x);else if(m.mode===tn.POINTS)f=new t0(y,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&wy(f,s),f.name=t.createUniqueName(s.name||"mesh_"+e),$n(f,s),m.extensions&&ri(i,f,m),t.assignFinalMaterial(f),d.push(f)}for(let p=0,g=d.length;p<g;p++)t.associations.set(d[p],{meshes:e,primitives:p});if(d.length===1)return s.extensions&&ri(i,d[0],s),d[0];const u=new Dt;s.extensions&&ri(i,u,s),t.associations.set(u,{meshes:e});for(let p=0,g=d.length;p<g;p++)u.add(d[p]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new _t(Lt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ir(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),$n(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),r=i,a=[],l=[];for(let c=0,h=r.length;c<h;c++){const d=r[c];if(d){a.push(d);const u=new ue;s!==null&&u.fromArray(s.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Pr(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],a=[],l=[],c=[],h=[];for(let d=0,u=i.channels.length;d<u;d++){const p=i.channels[d],g=i.samplers[p.sampler],y=p.target,m=y.node,f=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;y.node!==void 0&&(r.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",x)),c.push(g),h.push(y))}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(d){const u=d[0],p=d[1],g=d[2],y=d[3],m=d[4],f=[];for(let x=0,v=u.length;x<v;x++){const _=u[x],C=p[x],A=g[x],I=y[x],L=m[x];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const b=n._createAnimationTracks(_,C,A,I,L);if(b)for(let S=0;S<b.length;S++)f.push(b[S])}return new Sr(s,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),r})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)r.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),l]).then(function(c){const h=c[0],d=c[1],u=c[2];u!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(u,Ay)});for(let p=0,g=d.length;p<g;p++)h.add(d[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new Mr:c.length>1?h=new Dt:c.length===1?h=c[0]:h=new rt,h!==c[0])for(let d=0,u=c.length;d<u;d++)h.add(c[d]);if(s.name&&(h.userData.name=s.name,h.name=r),$n(h,s),s.extensions&&ri(n,h,s),s.matrix!==void 0){const d=new ue;d.fromArray(s.matrix),h.applyMatrix4(d)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Dt;n.name&&(s.name=i.createUniqueName(n.name)),$n(s,n),n.extensions&&ri(t,s,n);const r=n.nodes||[],a=[];for(let l=0,c=r.length;l<c;l++)a.push(i.getDependency("node",r[l]));return Promise.all(a).then(function(l){for(let h=0,d=l.length;h<d;h++)s.add(l[h]);const c=h=>{const d=new Map;for(const[u,p]of i.associations)(u instanceof an||u instanceof xt)&&d.set(u,p);return h.traverse(u=>{const p=i.associations.get(u);p!=null&&d.set(u,p)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const r=[],a=e.name?e.name:e.uuid,l=[];Gn[s.path]===Gn.weights?e.traverse(function(u){u.morphTargetInfluences&&l.push(u.name?u.name:u.uuid)}):l.push(a);let c;switch(Gn[s.path]){case Gn.weights:c=yi;break;case Gn.rotation:c=Fn;break;case Gn.position:case Gn.scale:c=vi;break;default:n.itemSize===1?c=yi:c=vi;break}const h=i.interpolation!==void 0?by[i.interpolation]:Zi,d=this._getArrayFromAccessor(n);for(let u=0,p=l.length;u<p;u++){const g=new c(l[u]+"."+Gn[s.path],t.array,d,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),r.push(g)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Wo(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Fn?_y:ch;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Cy(o,e,t){const n=e.attributes,i=new Yt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new T(l[0],l[1],l[2]),new T(c[0],c[1],c[2])),a.normalized){const h=Wo(ji[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new T,l=new T;for(let c=0,h=s.length;c<h;c++){const d=s[c];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],p=u.min,g=u.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),u.normalized){const y=Wo(ji[u.componentType]);l.multiplyScalar(y)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}o.boundingBox=i;const r=new gn;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,o.boundingSphere=r}function fc(o,e,t){const n=e.attributes,i=[];function s(r,a){return t.getDependency("accessor",r).then(function(l){o.setAttribute(a,l)})}for(const r in n){const a=Vo[r]||r.toLowerCase();a in o.attributes||i.push(s(n[r],a))}if(e.indices!==void 0&&!o.index){const r=t.getDependency("accessor",e.indices).then(function(a){o.setIndex(a)});i.push(r)}return Ze.workingColorSpace!==It&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),$n(o,e),Cy(o,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Sy(o,e.targets,t):o})}function Ry(o){let e=o>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Py(o){let e=1779033703^o.length;for(let t=0;t<o.length;t++)e=Math.imul(e^o.charCodeAt(t),3432918353),e=e<<13|e>>>19;return e=Math.imul(e^e>>>16,2246822507),e=Math.imul(e^e>>>13,3266489909),(e^e>>>16)>>>0}const Ly="cozy-adventure";function Dy(o=Ly){const e=typeof o=="number"?o:Py(o);return Ry(e)}class Fy{constructor(e,t=null,n=void 0){this.scene=e,this.collisionSystem=t,this.rng=Dy(n)}create(){this.createLighting(),this.createBasePlate(),this.createIsland(),this.createWater(),this.addEnvironmentTrees()}createLighting(){const e=new Rs(16777215,.6);this.scene.add(e);const t=new xi(16777215,.8);t.position.set(50,80,30),t.target.position.set(0,0,0),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.near=1,t.shadow.camera.far=200,t.shadow.camera.left=-50,t.shadow.camera.right=50,t.shadow.camera.top=50,t.shadow.camera.bottom=-50,t.shadow.bias=-.001,this.scene.add(t),this.scene.add(t.target)}createBasePlate(){}createIsland(){const e=new Dt;e.name="island";const t=new ln(120,135,6,64),n=new We({color:4881482}),i=new Le(t,n);i.position.y=3,i.receiveShadow=!0,i.castShadow=!0,i.name="islandBase",i.userData={isCollider:!0,colliderType:"ground"},e.add(i);const s=new la(120,150,64),r=new We({color:16049340,side:nn}),a=new Le(s,r);a.rotation.x=-Math.PI/2,a.position.y=.3,a.receiveShadow=!0,a.name="sandyShore",a.userData={isCollider:!0,colliderType:"ground"},e.add(a);for(let l=0;l<32;l++){const c=l/32*Math.PI*2,h=122+this.rng()*18,d=new qt(4+this.rng()*3,24,20),u=new We({color:16049340}),p=new Le(d,u);p.position.set(Math.cos(c)*h,.7,Math.sin(c)*h),p.scale.y=.2,p.receiveShadow=!0,e.add(p)}for(let l=0;l<28;l++){const c=l/28*Math.PI*2+this.rng()*.5,h=148+this.rng()*8,d=new ns(2+this.rng()*1.5),u=new We({color:6710886}),p=new Le(d,u);p.position.set(Math.cos(c)*h,.5,Math.sin(c)*h),p.rotation.set(this.rng()*Math.PI,this.rng()*Math.PI,this.rng()*Math.PI),p.castShadow=!0,p.receiveShadow=!0,e.add(p)}e.position.set(0,0,0),this.scene.add(e)}async addEnvironmentTrees(){const e=new Cn;this.treePositions=[],this.loadedTrees=[];const t=[{url:"assets/env_round_tree3.glb",scale:6.5,count:15},{url:"assets/env_tree2.glb",scale:7.8,count:12},{url:"assets/env_round_tree2.glb",scale:7.2,count:14},{url:"assets/env_apple_tree.glb",scale:5.8,count:8},{url:"assets/env_apple_tree2.glb",scale:6.2,count:10},{url:"assets/env_tree3.glb",scale:8.2,count:13},{url:"assets/env_round_tree.glb",scale:6.7,count:16},{url:"assets/env_tree.glb",scale:7.5,count:11},{url:"assets/env_apple_tree3.glb",scale:5.9,count:9}];for(const[n,i]of t.entries())try{const r=(await this.loadTreeModel(e,i.url)).scene;for(let a=0;a<i.count;a++){const l=this.createTreeInstance(r,i,n,a);l&&this.loadedTrees.push(l)}`${i.count}`,n+1}catch(s){console.error(`Failed to load tree type ${n+1}:`,s)}this.createAllTreeColliders(),`${this.loadedTrees.length}`}loadTreeModel(e,t){return new Promise((n,i)=>{e.load(t,n,void 0,i)})}createTreeInstance(e,t,n,i){const s=e.clone();let r=!1,a=0,l,c;for(;!r&&a<50;){const h=this.rng()*Math.PI*2,d=20+this.rng()*80;l=Math.cos(h)*d,c=Math.sin(h)*d;const u=t.scale*2;r=!0;for(const p of this.treePositions)if(Math.sqrt(Math.pow(l-p.x,2)+Math.pow(c-p.z,2))<u){r=!1;break}a++}if(r){s.position.set(l,6,c),this.treePositions.push({x:l,z:c,scale:t.scale}),s.rotation.y=this.rng()*Math.PI*2;const h=.8+this.rng()*.4,d=t.scale*h;return s.scale.set(d,d,d),s.traverse(u=>{u.isMesh&&(u.castShadow=!0,u.receiveShadow=!0,u.material&&(Array.isArray(u.material)?u.material.forEach(p=>{p.roughness!==void 0&&(p.roughness=1),p.metalness!==void 0&&(p.metalness=0)}):(u.material.roughness!==void 0&&(u.material.roughness=1),u.material.metalness!==void 0&&(u.material.metalness=0))))}),this.scene.add(s),{mesh:s,typeIndex:n,instanceIndex:i,position:{x:l,y:6,z:c}}}else return console.warn(`Could not find valid position for tree ${n}_${i} after ${a} attempts`),null}createAllTreeColliders(){if(!this.collisionSystem){console.warn("No collision system available for tree colliders");return}`${this.loadedTrees.length}`,this.loadedTrees.forEach(e=>{this.createTreeCollider(e)})}createTreeCollider(e){const i=new ln(.6,.6,3,8),s=new Xt({color:16711680,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1}),r=new Le(i,s);r.visible=!1,r.position.copy(e.mesh.position),r.position.y=e.position.y+3*.3,r.name=`treeCollider_${e.typeIndex}_${e.instanceIndex}`,r.userData.trunkRadius=.6,r.userData.trunkHeight=3,r.userData.associatedTree=e.mesh,r.raycast=function(){},this.scene.add(r),this.collisionSystem.addCollider(r,"mesh"),`${r.position.x.toFixed(1)}${r.position.y.toFixed(1)}${r.position.z.toFixed(1)}`}createWater(){const e=new Ts(800,800,64,64),t=new We({color:1990801,transparent:!0,opacity:.85,side:nn}),n=new Le(e,t);n.rotation.x=-Math.PI/2,n.position.y=.3,n.receiveShadow=!0,n.name="oceanWater",n.userData={isCollider:!0,colliderType:"ground"},this.scene.add(n),this.initializeWaveAnimation(n)}initializeWaveAnimation(e){this.waterMesh=e,this.waveTime=0,this.waveSpeed=.008,this.wavesPaused=!1,this.waveAnimationId=null;const n=e.geometry.attributes.position;this.originalWaterPositions=n.array.slice(),this.startWaveAnimation()}startWaveAnimation(){const e=()=>{if(!this.waterMesh)return;if(this.wavesPaused){this.waveAnimationId=requestAnimationFrame(e);return}this.waveTime+=this.waveSpeed;const t=this.waterMesh.geometry.attributes.position,n=t.array;for(let i=0;i<n.length;i+=3){const s=this.originalWaterPositions[i],r=this.originalWaterPositions[i+2],a=Math.sin(s*.015+this.waveTime*2)*.12,l=Math.cos(r*.018+this.waveTime*1.5)*.08,c=Math.sin((s+r)*.025+this.waveTime*2.5)*.05,h=Math.cos((s-r)*.022+this.waveTime*1.8)*.04,d=Math.sin(s*.045+this.waveTime*3.2)*.02,u=Math.cos(r*.038+this.waveTime*2.8)*.015,p=a+l+c+h+d+u;n[i+1]=p}t.needsUpdate=!0,this.waterMesh.geometry.computeVertexNormals(),this.waveAnimationId=requestAnimationFrame(e)};this.waveAnimationId=requestAnimationFrame(e)}pauseWaves(){this.wavesPaused=!0}resumeWaves(){this.wavesPaused=!1}}var mc=function(o){return URL.createObjectURL(new Blob([o],{type:"text/javascript"}))};try{URL.revokeObjectURL(mc(""))}catch{mc=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var on=Uint8Array,qn=Uint16Array,$o=Uint32Array,hh=new on([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),dh=new on([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),By=new on([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),uh=function(o,e){for(var t=new qn(31),n=0;n<31;++n)t[n]=e+=1<<o[n-1];for(var i=new $o(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)i[s]=s-t[n]<<5|n;return[t,i]},ph=uh(hh,2),fh=ph[0],Uy=ph[1];fh[28]=258,Uy[258]=28;var ky=uh(dh,0),Ny=ky[0],Xo=new qn(32768);for(var at=0;at<32768;++at){var Vn=(at&43690)>>>1|(at&21845)<<1;Vn=(Vn&52428)>>>2|(Vn&13107)<<2,Vn=(Vn&61680)>>>4|(Vn&3855)<<4,Xo[at]=((Vn&65280)>>>8|(Vn&255)<<8)>>>1}var ys=(function(o,e,t){for(var n=o.length,i=0,s=new qn(e);i<n;++i)++s[o[i]-1];var r=new qn(e);for(i=0;i<e;++i)r[i]=r[i-1]+s[i-1]<<1;var a;if(t){a=new qn(1<<e);var l=15-e;for(i=0;i<n;++i)if(o[i])for(var c=i<<4|o[i],h=e-o[i],d=r[o[i]-1]++<<h,u=d|(1<<h)-1;d<=u;++d)a[Xo[d]>>>l]=c}else for(a=new qn(n),i=0;i<n;++i)o[i]&&(a[i]=Xo[r[o[i]-1]++]>>>15-o[i]);return a}),Ps=new on(288);for(var at=0;at<144;++at)Ps[at]=8;for(var at=144;at<256;++at)Ps[at]=9;for(var at=256;at<280;++at)Ps[at]=7;for(var at=280;at<288;++at)Ps[at]=8;var mh=new on(32);for(var at=0;at<32;++at)mh[at]=5;var Oy=ys(Ps,9,1),zy=ys(mh,5,1),So=function(o){for(var e=o[0],t=1;t<o.length;++t)o[t]>e&&(e=o[t]);return e},un=function(o,e,t){var n=e/8|0;return(o[n]|o[n+1]<<8)>>(e&7)&t},wo=function(o,e){var t=e/8|0;return(o[t]|o[t+1]<<8|o[t+2]<<16)>>(e&7)},Hy=function(o){return(o/8|0)+(o&7&&1)},Gy=function(o,e,t){(t==null||t>o.length)&&(t=o.length);var n=new(o instanceof qn?qn:o instanceof $o?$o:on)(t-e);return n.set(o.subarray(e,t)),n},Vy=function(o,e,t){var n=o.length;if(!n||t&&!t.l&&n<5)return e||new on(0);var i=!e||t,s=!t||t.i;t||(t={}),e||(e=new on(n*3));var r=function(fe){var pe=e.length;if(fe>pe){var Ae=new on(Math.max(pe*2,fe));Ae.set(e),e=Ae}},a=t.f||0,l=t.p||0,c=t.b||0,h=t.l,d=t.d,u=t.m,p=t.n,g=n*8;do{if(!h){t.f=a=un(o,l,1);var y=un(o,l+1,3);if(l+=3,y)if(y==1)h=Oy,d=zy,u=9,p=5;else if(y==2){var v=un(o,l,31)+257,_=un(o,l+10,15)+4,C=v+un(o,l+5,31)+1;l+=14;for(var A=new on(C),I=new on(19),L=0;L<_;++L)I[By[L]]=un(o,l+L*3,7);l+=_*3;for(var b=So(I),S=(1<<b)-1,O=ys(I,b,1),L=0;L<C;){var z=O[un(o,l,S)];l+=z&15;var m=z>>>4;if(m<16)A[L++]=m;else{var Y=0,P=0;for(m==16?(P=3+un(o,l,3),l+=2,Y=A[L-1]):m==17?(P=3+un(o,l,7),l+=3):m==18&&(P=11+un(o,l,127),l+=7);P--;)A[L++]=Y}}var F=A.subarray(0,v),G=A.subarray(v);u=So(F),p=So(G),h=ys(F,u,1),d=ys(G,p,1)}else throw"invalid block type";else{var m=Hy(l)+4,f=o[m-4]|o[m-3]<<8,x=m+f;if(x>n){if(s)throw"unexpected EOF";break}i&&r(c+f),e.set(o.subarray(m,x),c),t.b=c+=f,t.p=l=x*8;continue}if(l>g){if(s)throw"unexpected EOF";break}}i&&r(c+131072);for(var j=(1<<u)-1,W=(1<<p)-1,X=l;;X=l){var Y=h[wo(o,l)&j],$=Y>>>4;if(l+=Y&15,l>g){if(s)throw"unexpected EOF";break}if(!Y)throw"invalid length/literal";if($<256)e[c++]=$;else if($==256){X=l,h=null;break}else{var te=$-254;if($>264){var L=$-257,ee=hh[L];te=un(o,l,(1<<ee)-1)+fh[L],l+=ee}var V=d[wo(o,l)&W],q=V>>>4;if(!V)throw"invalid distance";l+=V&15;var G=Ny[q];if(q>3){var ee=dh[q];G+=wo(o,l)&(1<<ee)-1,l+=ee}if(l>g){if(s)throw"unexpected EOF";break}i&&r(c+131072);for(var oe=c+te;c<oe;c+=4)e[c]=e[c-G],e[c+1]=e[c+1-G],e[c+2]=e[c+2-G],e[c+3]=e[c+3-G];c=oe}}t.l=h,t.p=X,t.b=c,h&&(a=1,t.m=u,t.d=d,t.n=p)}while(!a);return c==e.length?e:Gy(e,0,c)},Wy=new on(0),$y=function(o){if((o[0]&15)!=8||o[0]>>>4>7||(o[0]<<8|o[1])%31)throw"invalid zlib data";if(o[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Xy(o,e){return Vy(($y(o),o.subarray(2,-4)),e)}var jy=typeof TextDecoder<"u"&&new TextDecoder,qy=0;try{jy.decode(Wy,{stream:!0}),qy=1}catch{}function gh(o,e,t){const n=t.length-o-1;if(e>=t[n])return n-1;if(e<=t[o])return o;let i=o,s=n,r=Math.floor((i+s)/2);for(;e<t[r]||e>=t[r+1];)e<t[r]?s=r:i=r,r=Math.floor((i+s)/2);return r}function Yy(o,e,t,n){const i=[],s=[],r=[];i[0]=1;for(let a=1;a<=t;++a){s[a]=e-n[o+1-a],r[a]=n[o+a]-e;let l=0;for(let c=0;c<a;++c){const h=r[c+1],d=s[a-c],u=i[c]/(h+d);i[c]=l+h*u,l=d*u}i[a]=l}return i}function Ky(o,e,t,n){const i=gh(o,n,e),s=Yy(i,n,o,e),r=new Ye(0,0,0,0);for(let a=0;a<=o;++a){const l=t[i-o+a],c=s[a],h=l.w*c;r.x+=l.x*h,r.y+=l.y*h,r.z+=l.z*h,r.w+=l.w*c}return r}function Zy(o,e,t,n,i){const s=[];for(let d=0;d<=t;++d)s[d]=0;const r=[];for(let d=0;d<=n;++d)r[d]=s.slice(0);const a=[];for(let d=0;d<=t;++d)a[d]=s.slice(0);a[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let d=1;d<=t;++d){l[d]=e-i[o+1-d],c[d]=i[o+d]-e;let u=0;for(let p=0;p<d;++p){const g=c[p+1],y=l[d-p];a[d][p]=g+y;const m=a[p][d-1]/a[d][p];a[p][d]=u+g*m,u=y*m}a[d][d]=u}for(let d=0;d<=t;++d)r[0][d]=a[d][t];for(let d=0;d<=t;++d){let u=0,p=1;const g=[];for(let y=0;y<=t;++y)g[y]=s.slice(0);g[0][0]=1;for(let y=1;y<=n;++y){let m=0;const f=d-y,x=t-y;d>=y&&(g[p][0]=g[u][0]/a[x+1][f],m=g[p][0]*a[f][x]);const v=f>=-1?1:-f,_=d-1<=x?y-1:t-d;for(let A=v;A<=_;++A)g[p][A]=(g[u][A]-g[u][A-1])/a[x+1][f+A],m+=g[p][A]*a[f+A][x];d<=x&&(g[p][y]=-g[u][y-1]/a[x+1][d],m+=g[p][y]*a[d][x]),r[y][d]=m;const C=u;u=p,p=C}}let h=t;for(let d=1;d<=n;++d){for(let u=0;u<=t;++u)r[d][u]*=h;h*=t-d}return r}function Jy(o,e,t,n,i){const s=i<o?i:o,r=[],a=gh(o,n,e),l=Zy(a,n,o,s,e),c=[];for(let h=0;h<t.length;++h){const d=t[h].clone(),u=d.w;d.x*=u,d.y*=u,d.z*=u,c[h]=d}for(let h=0;h<=s;++h){const d=c[a-o].clone().multiplyScalar(l[h][0]);for(let u=1;u<=o;++u)d.add(c[a-o+u].clone().multiplyScalar(l[h][u]));r[h]=d}for(let h=s+1;h<=i+1;++h)r[h]=new Ye(0,0,0);return r}function Qy(o,e){let t=1;for(let i=2;i<=o;++i)t*=i;let n=1;for(let i=2;i<=e;++i)n*=i;for(let i=2;i<=o-e;++i)n*=i;return t/n}function ev(o){const e=o.length,t=[],n=[];for(let s=0;s<e;++s){const r=o[s];t[s]=new T(r.x,r.y,r.z),n[s]=r.w}const i=[];for(let s=0;s<e;++s){const r=t[s].clone();for(let a=1;a<=s;++a)r.sub(i[s-a].clone().multiplyScalar(Qy(s,a)*n[a]));i[s]=r.divideScalar(n[0])}return i}function tv(o,e,t,n,i){const s=Jy(o,e,t,n,i);return ev(s)}class nv extends n0{constructor(e,t,n,i,s){super(),this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=i||0,this.endKnot=s||this.knots.length-1;for(let r=0;r<n.length;++r){const a=n[r];this.controlPoints[r]=new Ye(a.x,a.y,a.z,a.w)}}getPoint(e,t=new T){const n=t,i=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=Ky(this.degree,this.knots,this.controlPoints,i);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new T){const n=t,i=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=tv(this.degree,this.knots,this.controlPoints,i,1);return n.copy(s[1]).normalize(),n}}let Oe,yt,zt;class iv extends Bn{constructor(e){super(e)}load(e,t,n,i){const s=this,r=s.path===""?Xi.extractUrlBase(e):s.path,a=new ca(this.manager);a.setPath(s.path),a.setResponseType("arraybuffer"),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(l){try{t(s.parse(l,r))}catch(c){i?i(c):console.error(c),s.manager.itemError(e)}},n,i)}parse(e,t){if(cv(e))Oe=new lv().parse(e);else{const i=_h(e);if(!hv(i))throw new Error("THREE.FBXLoader: Unknown format.");if(yc(i)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+yc(i));Oe=new av().parse(i)}const n=new rh(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new sv(n,this.manager).parse(Oe)}}class sv{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){yt=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),i=this.parseDeformers(),s=new rv().parse(i);return this.parseScene(i,s,n),zt}parseConnections(){const e=new Map;return"Connections"in Oe&&Oe.Connections.connections.forEach(function(n){const i=n[0],s=n[1],r=n[2];e.has(i)||e.set(i,{parents:[],children:[]});const a={ID:s,relationship:r};e.get(i).parents.push(a),e.has(s)||e.set(s,{parents:[],children:[]});const l={ID:i,relationship:r};e.get(s).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in Oe.Objects){const n=Oe.Objects.Video;for(const i in n){const s=n[i],r=parseInt(i);if(e[r]=s.RelativeFilename||s.Filename,"Content"in s){const a=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(a||l){const c=this.parseImage(n[i]);t[s.RelativeFilename||s.Filename]=c}}}}for(const n in e){const i=e[n];t[i]!==void 0?e[n]=t[i]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){const t=e.Content,n=e.RelativeFilename||e.Filename,i=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(i){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;default:console.warn('FBXLoader: Image type "'+i+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const r=new Uint8Array(t);return window.URL.createObjectURL(new Blob([r],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in Oe.Objects){const n=Oe.Objects.Texture;for(const i in n){const s=this.parseTexture(n[i],e);t.set(parseInt(i),s)}}return t}parseTexture(e,t){const n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;const i=e.WrapModeU,s=e.WrapModeV,r=i!==void 0?i.value:0,a=s!==void 0?s.value:0;if(n.wrapS=r===0?Jn:$t,n.wrapT=a===0?Jn:$t,"Scaling"in e){const l=e.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(e,t){let n;const i=this.textureLoader.path,s=yt.get(e.id).children;s!==void 0&&s.length>0&&t[s[0].ID]!==void 0&&(n=t[s[0].ID],(n.indexOf("blob:")===0||n.indexOf("data:")===0)&&this.textureLoader.setPath(void 0));let r;const a=e.FileName.slice(-3).toLowerCase();if(a==="tga"){const l=this.manager.getHandler(".tga");l===null?(console.warn("FBXLoader: TGA loader not found, creating placeholder texture for",e.RelativeFilename),r=new xt):(l.setPath(this.textureLoader.path),r=l.load(n))}else if(a==="dds"){const l=this.manager.getHandler(".dds");l===null?(console.warn("FBXLoader: DDS loader not found, creating placeholder texture for",e.RelativeFilename),r=new xt):(l.setPath(this.textureLoader.path),r=l.load(n))}else a==="psd"?(console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for",e.RelativeFilename),r=new xt):r=this.textureLoader.load(n);return this.textureLoader.setPath(i),r}parseMaterials(e){const t=new Map;if("Material"in Oe.Objects){const n=Oe.Objects.Material;for(const i in n){const s=this.parseMaterial(n[i],e);s!==null&&t.set(parseInt(i),s)}}return t}parseMaterial(e,t){const n=e.id,i=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!yt.has(n))return null;const r=this.parseParameters(e,t,n);let a;switch(s.toLowerCase()){case"phong":a=new Gt;break;case"lambert":a=new We;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),a=new Gt;break}return a.setValues(r),a.name=i,a}parseParameters(e,t,n){const i={};e.BumpFactor&&(i.bumpScale=e.BumpFactor.value),e.Diffuse?i.color=new ce().fromArray(e.Diffuse.value).convertSRGBToLinear():e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(i.color=new ce().fromArray(e.DiffuseColor.value).convertSRGBToLinear()),e.DisplacementFactor&&(i.displacementScale=e.DisplacementFactor.value),e.Emissive?i.emissive=new ce().fromArray(e.Emissive.value).convertSRGBToLinear():e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(i.emissive=new ce().fromArray(e.EmissiveColor.value).convertSRGBToLinear()),e.EmissiveFactor&&(i.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),e.Opacity&&(i.opacity=parseFloat(e.Opacity.value)),i.opacity<1&&(i.transparent=!0),e.ReflectionFactor&&(i.reflectivity=e.ReflectionFactor.value),e.Shininess&&(i.shininess=e.Shininess.value),e.Specular?i.specular=new ce().fromArray(e.Specular.value).convertSRGBToLinear():e.SpecularColor&&e.SpecularColor.type==="Color"&&(i.specular=new ce().fromArray(e.SpecularColor.value).convertSRGBToLinear());const s=this;return yt.get(n).children.forEach(function(r){const a=r.relationship;switch(a){case"Bump":i.bumpMap=s.getTexture(t,r.ID);break;case"Maya|TEX_ao_map":i.aoMap=s.getTexture(t,r.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":i.map=s.getTexture(t,r.ID),i.map!==void 0&&(i.map.colorSpace=tt);break;case"DisplacementColor":i.displacementMap=s.getTexture(t,r.ID);break;case"EmissiveColor":i.emissiveMap=s.getTexture(t,r.ID),i.emissiveMap!==void 0&&(i.emissiveMap.colorSpace=tt);break;case"NormalMap":case"Maya|TEX_normal_map":i.normalMap=s.getTexture(t,r.ID);break;case"ReflectionColor":i.envMap=s.getTexture(t,r.ID),i.envMap!==void 0&&(i.envMap.mapping=fr,i.envMap.colorSpace=tt);break;case"SpecularColor":i.specularMap=s.getTexture(t,r.ID),i.specularMap!==void 0&&(i.specularMap.colorSpace=tt);break;case"TransparentColor":case"TransparencyFactor":i.alphaMap=s.getTexture(t,r.ID),i.transparent=!0;break;default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",a);break}}),i}getTexture(e,t){return"LayeredTexture"in Oe.Objects&&t in Oe.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=yt.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in Oe.Objects){const n=Oe.Objects.Deformer;for(const i in n){const s=n[i],r=yt.get(parseInt(i));if(s.attrType==="Skin"){const a=this.parseSkeleton(r,n);a.ID=i,r.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),a.geometryID=r.parents[0].ID,e[i]=a}else if(s.attrType==="BlendShape"){const a={id:i};a.rawTargets=this.parseMorphTargets(r,n),a.id=i,r.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[i]=a}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const n=[];return e.children.forEach(function(i){const s=t[i.ID];if(s.attrType!=="Cluster")return;const r={ID:i.ID,indices:[],weights:[],transformLink:new ue().fromArray(s.TransformLink.a)};"Indexes"in s&&(r.indices=s.Indexes.a,r.weights=s.Weights.a),n.push(r)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){const n=[];for(let i=0;i<e.children.length;i++){const s=e.children[i],r=t[s.ID],a={name:r.attrName,initialWeight:r.DeformPercent,id:r.id,fullWeights:r.FullWeights.a};if(r.attrType!=="BlendShapeChannel")return;a.geoID=yt.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(a)}return n}parseScene(e,t,n){zt=new Dt;const i=this.parseModels(e.skeletons,t,n),s=Oe.Objects.Model,r=this;i.forEach(function(l){const c=s[l.ID];r.setLookAtProperties(l,c),yt.get(l.ID).parents.forEach(function(d){const u=i.get(d.ID);u!==void 0&&u.add(l)}),l.parent===null&&zt.add(l)}),this.bindSkeleton(e.skeletons,t,i),this.addGlobalSceneSettings(),zt.traverse(function(l){if(l.userData.transformData){l.parent&&(l.userData.transformData.parentMatrix=l.parent.matrix,l.userData.transformData.parentMatrixWorld=l.parent.matrixWorld);const c=vh(l.userData.transformData);l.applyMatrix4(c),l.updateWorldMatrix()}});const a=new ov().parse();zt.children.length===1&&zt.children[0].isGroup&&(zt.children[0].animations=a,zt=zt.children[0]),zt.animations=a}parseModels(e,t,n){const i=new Map,s=Oe.Objects.Model;for(const r in s){const a=parseInt(r),l=s[r],c=yt.get(a);let h=this.buildSkeleton(c,e,a,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,t,n);break;case"NurbsCurve":h=this.createCurve(c,t);break;case"LimbNode":case"Root":h=new Mr;break;default:h=new Dt;break}h.name=l.attrName?Xe.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=a}this.getTransformData(h,l),i.set(a,h)}return i}buildSkeleton(e,t,n,i){let s=null;return e.parents.forEach(function(r){for(const a in t){const l=t[a];l.rawBones.forEach(function(c,h){if(c.ID===r.ID){const d=s;s=new Mr,s.matrixWorld.copy(c.transformLink),s.name=i?Xe.sanitizeNodeName(i):"",s.userData.originalName=i,s.ID=n,l.bones[h]=s,d!==null&&s.add(d)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(i){const s=Oe.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)t=new rt;else{let i=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(i=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let r=1e3;n.FarPlane!==void 0&&(r=n.FarPlane.value/1e3);let a=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(a=n.AspectWidth.value,l=n.AspectHeight.value);const c=a/l;let h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);const d=n.FocalLength?n.FocalLength.value:null;switch(i){case 0:t=new _t(h,c,s,r),d!==null&&t.setFocalLength(d);break;case 1:t=new Ir(-a/2,a/2,l/2,-l/2,s,r);break;default:console.warn("THREE.FBXLoader: Unknown camera type "+i+"."),t=new rt;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(i){const s=Oe.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)t=new rt;else{let i;n.LightType===void 0?i=0:i=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=new ce().fromArray(n.Color.value).convertSRGBToLinear());let r=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(r=0);let a=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?a=0:a=n.FarAttenuationEnd.value);const l=1;switch(i){case 0:t=new Ho(s,r,a,l);break;case 1:t=new xi(s,r);break;case 2:let c=Math.PI/3;n.InnerAngle!==void 0&&(c=Lt.degToRad(n.InnerAngle.value));let h=0;n.OuterAngle!==void 0&&(h=Lt.degToRad(n.OuterAngle.value),h=Math.max(h,1)),t=new oh(s,r,a,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new Ho(s,r);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let i,s=null,r=null;const a=[];return e.children.forEach(function(l){t.has(l.ID)&&(s=t.get(l.ID)),n.has(l.ID)&&a.push(n.get(l.ID))}),a.length>1?r=a:a.length>0?r=a[0]:(r=new Gt({name:Bn.DEFAULT_MATERIAL_NAME,color:13421772}),a.push(r)),"color"in s.attributes&&a.forEach(function(l){l.vertexColors=!0}),s.FBX_Deformer?(i=new Zc(s,r),i.normalizeSkinWeights()):i=new Le(s,r),i}createCurve(e,t){const n=e.children.reduce(function(s,r){return t.has(r.ID)&&(s=t.get(r.ID)),s},null),i=new Ln({name:Bn.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new ts(n,i)}getTransformData(e,t){const n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=xh(t.RotationOrder.value):n.eulerOrder="ZYX","Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&yt.get(e.ID).children.forEach(function(i){if(i.relationship==="LookAtProperty"){const s=Oe.Objects.Model[i.ID];if("Lcl_Translation"in s){const r=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(r),zt.add(e.target)):e.lookAt(new T().fromArray(r))}}})}bindSkeleton(e,t,n){const i=this.parsePoseNodes();for(const s in e){const r=e[s];yt.get(parseInt(r.ID)).parents.forEach(function(l){if(t.has(l.ID)){const c=l.ID;yt.get(c).parents.forEach(function(d){n.has(d.ID)&&n.get(d.ID).bind(new Pr(r.bones),i[d.ID])})}})}}parsePoseNodes(){const e={};if("Pose"in Oe.Objects){const t=Oe.Objects.Pose;for(const n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){const i=t[n].PoseNode;Array.isArray(i)?i.forEach(function(s){e[s.Node]=new ue().fromArray(s.Matrix.a)}):e[i.Node]=new ue().fromArray(i.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in Oe){if("AmbientColor"in Oe.GlobalSettings){const e=Oe.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],i=e[2];if(t!==0||n!==0||i!==0){const s=new ce(t,n,i).convertSRGBToLinear();zt.add(new Rs(s,1))}}"UnitScaleFactor"in Oe.GlobalSettings&&(zt.userData.unitScaleFactor=Oe.GlobalSettings.UnitScaleFactor.value)}}}class rv{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in Oe.Objects){const n=Oe.Objects.Geometry;for(const i in n){const s=yt.get(parseInt(i)),r=this.parseGeometry(s,n[i],e);t.set(parseInt(i),r)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){const i=n.skeletons,s=[],r=e.parents.map(function(d){return Oe.Objects.Model[d.ID]});if(r.length===0)return;const a=e.children.reduce(function(d,u){return i[u.ID]!==void 0&&(d=i[u.ID]),d},null);e.children.forEach(function(d){n.morphTargets[d.ID]!==void 0&&s.push(n.morphTargets[d.ID])});const l=r[0],c={};"RotationOrder"in l&&(c.eulerOrder=xh(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const h=vh(c);return this.genGeometry(t,a,s,h)}genGeometry(e,t,n,i){const s=new mt;e.attrName&&(s.name=e.attrName);const r=this.parseGeoNode(e,t),a=this.genBuffers(r),l=new Ke(a.vertex,3);if(l.applyMatrix4(i),s.setAttribute("position",l),a.colors.length>0&&s.setAttribute("color",new Ke(a.colors,3)),t&&(s.setAttribute("skinIndex",new ea(a.weightsIndices,4)),s.setAttribute("skinWeight",new Ke(a.vertexWeights,4)),s.FBX_Deformer=t),a.normal.length>0){const c=new ze().getNormalMatrix(i),h=new Ke(a.normal,3);h.applyNormalMatrix(c),s.setAttribute("normal",h)}if(a.uvs.forEach(function(c,h){const d=h===0?"uv":`uv${h}`;s.setAttribute(d,new Ke(a.uvs[h],2))}),r.material&&r.material.mappingType!=="AllSame"){let c=a.materialIndex[0],h=0;if(a.materialIndex.forEach(function(d,u){d!==c&&(s.addGroup(h,u-h,c),c=d,h=u)}),s.groups.length>0){const d=s.groups[s.groups.length-1],u=d.start+d.count;u!==a.materialIndex.length&&s.addGroup(u,a.materialIndex.length-u,c)}s.groups.length===0&&s.addGroup(0,a.materialIndex.length,a.materialIndex[0])}return this.addMorphTargets(s,e,n,i),s}parseGeoNode(e,t){const n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let i=0;for(;e.LayerElementUV[i];)e.LayerElementUV[i].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[i])),i++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(i,s){i.indices.forEach(function(r,a){n.weightTable[r]===void 0&&(n.weightTable[r]=[]),n.weightTable[r].push({id:s,weight:i.weights[a]})})})),n}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,i=0,s=!1,r=[],a=[],l=[],c=[],h=[],d=[];const u=this;return e.vertexIndices.forEach(function(p,g){let y,m=!1;p<0&&(p=p^-1,m=!0);let f=[],x=[];if(r.push(p*3,p*3+1,p*3+2),e.color){const v=hr(g,n,p,e.color);l.push(v[0],v[1],v[2])}if(e.skeleton){if(e.weightTable[p]!==void 0&&e.weightTable[p].forEach(function(v){x.push(v.weight),f.push(v.id)}),x.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const v=[0,0,0,0],_=[0,0,0,0];x.forEach(function(C,A){let I=C,L=f[A];_.forEach(function(b,S,O){if(I>b){O[S]=I,I=b;const z=v[S];v[S]=L,L=z}})}),f=v,x=_}for(;x.length<4;)x.push(0),f.push(0);for(let v=0;v<4;++v)h.push(x[v]),d.push(f[v])}if(e.normal){const v=hr(g,n,p,e.normal);a.push(v[0],v[1],v[2])}e.material&&e.material.mappingType!=="AllSame"&&(y=hr(g,n,p,e.material)[0],y<0&&(u.negativeMaterialIndices=!0,y=0)),e.uv&&e.uv.forEach(function(v,_){const C=hr(g,n,p,v);c[_]===void 0&&(c[_]=[]),c[_].push(C[0]),c[_].push(C[1])}),i++,m&&(u.genFace(t,e,r,y,a,l,c,h,d,i),n++,i=0,r=[],a=[],l=[],c=[],h=[],d=[])}),t}getNormalNewell(e){const t=new T(0,0,0);for(let n=0;n<e.length;n++){const i=e[n],s=e[(n+1)%e.length];t.x+=(i.y-s.y)*(i.z+s.z),t.y+=(i.z-s.z)*(i.x+s.x),t.z+=(i.x-s.x)*(i.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),i=(Math.abs(t.z)>.5?new T(0,1,0):new T(0,0,1)).cross(t).normalize(),s=t.clone().cross(i).normalize();return{normal:t,tangent:i,bitangent:s}}flattenVertex(e,t,n){return new Ee(e.dot(t),e.dot(n))}genFace(e,t,n,i,s,r,a,l,c,h){let d;if(h>3){const u=[];for(let m=0;m<n.length;m+=3)u.push(new T(t.vertexPositions[n[m]],t.vertexPositions[n[m+1]],t.vertexPositions[n[m+2]]));const{tangent:p,bitangent:g}=this.getNormalTangentAndBitangent(u),y=[];for(const m of u)y.push(this.flattenVertex(m,p,g));d=aa.triangulateShape(y,[])}else d=[[0,1,2]];for(const[u,p,g]of d)e.vertex.push(t.vertexPositions[n[u*3]]),e.vertex.push(t.vertexPositions[n[u*3+1]]),e.vertex.push(t.vertexPositions[n[u*3+2]]),e.vertex.push(t.vertexPositions[n[p*3]]),e.vertex.push(t.vertexPositions[n[p*3+1]]),e.vertex.push(t.vertexPositions[n[p*3+2]]),e.vertex.push(t.vertexPositions[n[g*3]]),e.vertex.push(t.vertexPositions[n[g*3+1]]),e.vertex.push(t.vertexPositions[n[g*3+2]]),t.skeleton&&(e.vertexWeights.push(l[u*4]),e.vertexWeights.push(l[u*4+1]),e.vertexWeights.push(l[u*4+2]),e.vertexWeights.push(l[u*4+3]),e.vertexWeights.push(l[p*4]),e.vertexWeights.push(l[p*4+1]),e.vertexWeights.push(l[p*4+2]),e.vertexWeights.push(l[p*4+3]),e.vertexWeights.push(l[g*4]),e.vertexWeights.push(l[g*4+1]),e.vertexWeights.push(l[g*4+2]),e.vertexWeights.push(l[g*4+3]),e.weightsIndices.push(c[u*4]),e.weightsIndices.push(c[u*4+1]),e.weightsIndices.push(c[u*4+2]),e.weightsIndices.push(c[u*4+3]),e.weightsIndices.push(c[p*4]),e.weightsIndices.push(c[p*4+1]),e.weightsIndices.push(c[p*4+2]),e.weightsIndices.push(c[p*4+3]),e.weightsIndices.push(c[g*4]),e.weightsIndices.push(c[g*4+1]),e.weightsIndices.push(c[g*4+2]),e.weightsIndices.push(c[g*4+3])),t.color&&(e.colors.push(r[u*3]),e.colors.push(r[u*3+1]),e.colors.push(r[u*3+2]),e.colors.push(r[p*3]),e.colors.push(r[p*3+1]),e.colors.push(r[p*3+2]),e.colors.push(r[g*3]),e.colors.push(r[g*3+1]),e.colors.push(r[g*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(i),e.materialIndex.push(i),e.materialIndex.push(i)),t.normal&&(e.normal.push(s[u*3]),e.normal.push(s[u*3+1]),e.normal.push(s[u*3+2]),e.normal.push(s[p*3]),e.normal.push(s[p*3+1]),e.normal.push(s[p*3+2]),e.normal.push(s[g*3]),e.normal.push(s[g*3+1]),e.normal.push(s[g*3+2])),t.uv&&t.uv.forEach(function(y,m){e.uvs[m]===void 0&&(e.uvs[m]=[]),e.uvs[m].push(a[m][u*2]),e.uvs[m].push(a[m][u*2+1]),e.uvs[m].push(a[m][p*2]),e.uvs[m].push(a[m][p*2+1]),e.uvs[m].push(a[m][g*2]),e.uvs[m].push(a[m][g*2+1])})}addMorphTargets(e,t,n,i){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=this;n.forEach(function(r){r.rawTargets.forEach(function(a){const l=Oe.Objects.Geometry[a.geoID];l!==void 0&&s.genMorphGeometry(e,t,l,i,a.name)})})}genMorphGeometry(e,t,n,i,s){const r=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],a=n.Vertices!==void 0?n.Vertices.a:[],l=n.Indexes!==void 0?n.Indexes.a:[],c=e.attributes.position.count*3,h=new Float32Array(c);for(let g=0;g<l.length;g++){const y=l[g]*3;h[y]=a[g*3],h[y+1]=a[g*3+1],h[y+2]=a[g*3+2]}const d={vertexIndices:r,vertexPositions:h},u=this.genBuffers(d),p=new Ke(u.vertex,3);p.name=s||n.attrName,p.applyMatrix4(i),e.morphAttributes.position.push(p)}parseNormals(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:i,indices:s,mappingType:t,referenceType:n}}parseUVs(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.UV.a;let s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:i,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.Colors.a;let s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let r=0,a=new ce;r<i.length;r+=4)a.fromArray(i,r).convertSRGBToLinear().toArray(i,r);return{dataSize:4,buffer:i,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){const t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const i=e.Materials.a,s=[];for(let r=0;r<i.length;++r)s.push(r);return{dataSize:1,buffer:i,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new mt;const n=t-1,i=e.KnotVector.a,s=[],r=e.Points.a;for(let d=0,u=r.length;d<u;d+=4)s.push(new Ye().fromArray(r,d));let a,l;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){a=n,l=i.length-1-a;for(let d=0;d<n;++d)s.push(s[d])}const h=new nv(n,i,s,a,l).getPoints(s.length*12);return new mt().setFromPoints(h)}}class ov{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const n in t){const i=t[n],s=this.addClip(i);e.push(s)}return e}parseClips(){if(Oe.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=Oe.Objects.AnimationCurveNode,t=new Map;for(const n in e){const i=e[n];if(i.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:i.id,attr:i.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=Oe.Objects.AnimationCurve;for(const n in t){const i={id:t[n].id,times:t[n].KeyTime.a.map(dv),values:t[n].KeyValueFloat.a},s=yt.get(i.id);if(s!==void 0){const r=s.parents[0].ID,a=s.parents[0].relationship;a.match(/X/)?e.get(r).curves.x=i:a.match(/Y/)?e.get(r).curves.y=i:a.match(/Z/)?e.get(r).curves.z=i:a.match(/DeformPercent/)&&e.has(r)&&(e.get(r).curves.morph=i)}}}parseAnimationLayers(e){const t=Oe.Objects.AnimationLayer,n=new Map;for(const i in t){const s=[],r=yt.get(parseInt(i));r!==void 0&&(r.children.forEach(function(l,c){if(e.has(l.ID)){const h=e.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(s[c]===void 0){const d=yt.get(l.ID).parents.filter(function(u){return u.relationship!==void 0})[0].ID;if(d!==void 0){const u=Oe.Objects.Model[d.toString()];if(u===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const p={modelName:u.attrName?Xe.sanitizeNodeName(u.attrName):"",ID:u.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};zt.traverse(function(g){g.ID===u.id&&(p.transform=g.matrix,g.userData.transformData&&(p.eulerOrder=g.userData.transformData.eulerOrder))}),p.transform||(p.transform=new ue),"PreRotation"in u&&(p.preRotation=u.PreRotation.value),"PostRotation"in u&&(p.postRotation=u.PostRotation.value),s[c]=p}}s[c]&&(s[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(s[c]===void 0){const d=yt.get(l.ID).parents.filter(function(f){return f.relationship!==void 0})[0].ID,u=yt.get(d).parents[0].ID,p=yt.get(u).parents[0].ID,g=yt.get(p).parents[0].ID,y=Oe.Objects.Model[g],m={modelName:y.attrName?Xe.sanitizeNodeName(y.attrName):"",morphName:Oe.Objects.Deformer[d].attrName};s[c]=m}s[c][h.attr]=h}}}),n.set(parseInt(i),s))}return n}parseAnimStacks(e){const t=Oe.Objects.AnimationStack,n={};for(const i in t){const s=yt.get(parseInt(i)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const r=e.get(s[0].ID);n[i]={name:t[i].attrName,layer:r}}return n}addClip(e){let t=[];const n=this;return e.layer.forEach(function(i){t=t.concat(n.generateTracks(i))}),new Sr(e.name,-1,t)}generateTracks(e){const t=[];let n=new T,i=new T;if(e.transform&&e.transform.decompose(n,new ht,i),n=n.toArray(),i=i.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,i,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,i){const s=this.getTimesForAllAxes(t),r=this.getKeyframeTrackValues(s,t,n);return new vi(e+"."+i,s,r)}generateRotationTrack(e,t,n,i,s){let r,a;if(t.x!==void 0&&t.y!==void 0&&t.z!==void 0){const d=this.interpolateRotations(t.x,t.y,t.z,s);r=d[0],a=d[1]}n!==void 0&&(n=n.map(Lt.degToRad),n.push(s),n=new Wt().fromArray(n),n=new ht().setFromEuler(n)),i!==void 0&&(i=i.map(Lt.degToRad),i.push(s),i=new Wt().fromArray(i),i=new ht().setFromEuler(i).invert());const l=new ht,c=new Wt,h=[];if(!a||!r)return new Fn(e+".quaternion",[],[]);for(let d=0;d<a.length;d+=3)c.set(a[d],a[d+1],a[d+2],s),l.setFromEuler(c),n!==void 0&&l.premultiply(n),i!==void 0&&l.multiply(i),d>2&&new ht().fromArray(h,(d-3)/3*4).dot(l)<0&&l.set(-l.x,-l.y,-l.z,-l.w),l.toArray(h,d/3*4);return new Fn(e+".quaternion",r,h)}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),i=zt.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new yi(e.modelName+".morphTargetInfluences["+i+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,i){return n-i}),t.length>1){let n=1,i=t[0];for(let s=1;s<t.length;s++){const r=t[s];r!==i&&(t[n]=r,i=r,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){const i=n,s=[];let r=-1,a=-1,l=-1;return e.forEach(function(c){if(t.x&&(r=t.x.times.indexOf(c)),t.y&&(a=t.y.times.indexOf(c)),t.z&&(l=t.z.times.indexOf(c)),r!==-1){const h=t.x.values[r];s.push(h),i[0]=h}else s.push(i[0]);if(a!==-1){const h=t.y.values[a];s.push(h),i[1]=h}else s.push(i[1]);if(l!==-1){const h=t.z.values[l];s.push(h),i[2]=h}else s.push(i[2])}),s}interpolateRotations(e,t,n,i){const s=[],r=[];s.push(e.times[0]),r.push(Lt.degToRad(e.values[0])),r.push(Lt.degToRad(t.values[0])),r.push(Lt.degToRad(n.values[0]));for(let a=1;a<e.values.length;a++){const l=[e.values[a-1],t.values[a-1],n.values[a-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map(Lt.degToRad),h=[e.values[a],t.values[a],n.values[a]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;const d=h.map(Lt.degToRad),u=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],p=[Math.abs(u[0]),Math.abs(u[1]),Math.abs(u[2])];if(p[0]>=180||p[1]>=180||p[2]>=180){const y=Math.max(...p)/180,m=new Wt(...c,i),f=new Wt(...d,i),x=new ht().setFromEuler(m),v=new ht().setFromEuler(f);x.dot(v)&&v.set(-v.x,-v.y,-v.z,-v.w);const _=e.times[a-1],C=e.times[a]-_,A=new ht,I=new Wt;for(let L=0;L<1;L+=1/y)A.copy(x.clone().slerp(v.clone(),L)),s.push(_+L*C),I.setFromQuaternion(A,i),r.push(I.x),r.push(I.y),r.push(I.z)}else s.push(e.times[a]),r.push(Lt.degToRad(e.values[a])),r.push(Lt.degToRad(t.values[a])),r.push(Lt.degToRad(n.values[a]))}return[s,r]}}class av{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new yh,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,n=e.split(/[\r\n]+/);return n.forEach(function(i,s){const r=i.match(/^[\s\t]*;/),a=i.match(/^[\s\t]*$/);if(r||a)return;const l=i.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),c=i.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=i.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(i,l):c?t.parseNodeProperty(i,c,n[++s]):h?t.popStack():i.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(i)}),this.allNodes}parseNodeBegin(e,t){const n=t[1].trim().replace(/^"/,"").replace(/"$/,""),i=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},r=this.parseNodeAttr(i),a=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in a?(n==="PoseNode"?a.PoseNode.push(s):a[n].id!==void 0&&(a[n]={},a[n][a[n].id]=a[n]),r.id!==""&&(a[n][r.id]=s)):typeof r.id=="number"?(a[n]={},a[n][r.id]=s):n!=="Properties70"&&(n==="PoseNode"?a[n]=[s]:a[n]=s),typeof r.id=="number"&&(s.id=r.id),r.name!==""&&(s.attrName=r.name),r.type!==""&&(s.attrType=r.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",i="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),i=e[2]),{id:t,name:n,type:i}}parseNodeProperty(e,t,n){let i=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();i==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const r=this.getCurrentNode();if(r.name==="Properties70"){this.parseNodeSpecialProperty(e,i,s);return}if(i==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]);let d=s.split(",").slice(3);d=d.map(function(u){return u.trim().replace(/^"/,"")}),i="connections",s=[c,h],pv(s,d),r[i]===void 0&&(r[i]=[])}i==="Node"&&(r.id=s),i in r&&Array.isArray(r[i])?r[i].push(s):i!=="a"?r[i]=s:r.a=s,this.setCurrentProp(r,i),i==="a"&&s.slice(-1)!==","&&(r.a=To(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=To(t.a))}parseNodeSpecialProperty(e,t,n){const i=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=i[0],r=i[1],a=i[2],l=i[3];let c=i[4];switch(r){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=To(c);break}this.getPrevNode()[s]={type:r,type2:a,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class lv{parse(e){const t=new gc(e);t.skip(23);const n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const i=new yh;for(;!this.endOfContent(t);){const s=this.parseNode(t,n);s!==null&&i.add(s.name,s)}return i}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const n={},i=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const r=e.getUint8(),a=e.getString(r);if(i===0)return null;const l=[];for(let u=0;u<s;u++)l.push(this.parseProperty(e));const c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",d=l.length>2?l[2]:"";for(n.singleProperty=s===1&&e.getOffset()===i;i>e.getOffset();){const u=this.parseNode(e,t);u!==null&&this.parseSubNode(a,n,u)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),d!==""&&(n.attrType=d),a!==""&&(n.name=a),n}parseSubNode(e,t,n){if(n.singleProperty===!0){const i=n.propertyList[0];Array.isArray(i)?(t[n.name]=n,n.a=i):t[n.name]=i}else if(e==="Connections"&&n.name==="C"){const i=[];n.propertyList.forEach(function(s,r){r!==0&&i.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(i)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let i=n.propertyList[0],s=n.propertyList[1];const r=n.propertyList[2],a=n.propertyList[3];let l;i.indexOf("Lcl ")===0&&(i=i.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],t[i]={type:s,type2:r,flag:a,value:l}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){const t=e.getString(1);let n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const i=e.getUint32(),s=e.getUint32(),r=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(i);case"d":return e.getFloat64Array(i);case"f":return e.getFloat32Array(i);case"i":return e.getInt32Array(i);case"l":return e.getInt64Array(i)}const a=Xy(new Uint8Array(e.getArrayBuffer(r))),l=new gc(a.buffer);switch(t){case"b":case"c":return l.getBooleanArray(i);case"d":return l.getFloat64Array(i);case"f":return l.getFloat32Array(i);case"i":return l.getInt32Array(i);case"l":return l.getInt64Array(i)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class gc{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const i=n.indexOf(0);return i>=0&&(n=new Uint8Array(this.dv.buffer,t,i)),this._textDecoder.decode(n)}}class yh{add(e,t){this[e]=t}}function cv(o){const e="Kaydara FBX Binary  \0";return o.byteLength>=e.length&&e===_h(o,0,e.length)}function hv(o){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function n(i){const s=o[i-1];return o=o.slice(t+i),t++,s}for(let i=0;i<e.length;++i)if(n(1)===e[i])return!1;return!0}function yc(o){const e=/FBXVersion: (\d+)/,t=o.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function dv(o){return o/46186158e3}const uv=[];function hr(o,e,t,n){let i;switch(n.mappingType){case"ByPolygonVertex":i=o;break;case"ByPolygon":i=e;break;case"ByVertice":i=t;break;case"AllSame":i=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(i=n.indices[i]);const s=i*n.dataSize,r=s+n.dataSize;return fv(uv,n.buffer,s,r)}const Eo=new Wt,Ni=new T;function vh(o){const e=new ue,t=new ue,n=new ue,i=new ue,s=new ue,r=new ue,a=new ue,l=new ue,c=new ue,h=new ue,d=new ue,u=new ue,p=o.inheritType?o.inheritType:0;if(o.translation&&e.setPosition(Ni.fromArray(o.translation)),o.preRotation){const S=o.preRotation.map(Lt.degToRad);S.push(o.eulerOrder||Wt.DEFAULT_ORDER),t.makeRotationFromEuler(Eo.fromArray(S))}if(o.rotation){const S=o.rotation.map(Lt.degToRad);S.push(o.eulerOrder||Wt.DEFAULT_ORDER),n.makeRotationFromEuler(Eo.fromArray(S))}if(o.postRotation){const S=o.postRotation.map(Lt.degToRad);S.push(o.eulerOrder||Wt.DEFAULT_ORDER),i.makeRotationFromEuler(Eo.fromArray(S)),i.invert()}o.scale&&s.scale(Ni.fromArray(o.scale)),o.scalingOffset&&a.setPosition(Ni.fromArray(o.scalingOffset)),o.scalingPivot&&r.setPosition(Ni.fromArray(o.scalingPivot)),o.rotationOffset&&l.setPosition(Ni.fromArray(o.rotationOffset)),o.rotationPivot&&c.setPosition(Ni.fromArray(o.rotationPivot)),o.parentMatrixWorld&&(d.copy(o.parentMatrix),h.copy(o.parentMatrixWorld));const g=t.clone().multiply(n).multiply(i),y=new ue;y.extractRotation(h);const m=new ue;m.copyPosition(h);const f=m.clone().invert().multiply(h),x=y.clone().invert().multiply(f),v=s,_=new ue;if(p===0)_.copy(y).multiply(g).multiply(x).multiply(v);else if(p===1)_.copy(y).multiply(x).multiply(g).multiply(v);else{const O=new ue().scale(new T().setFromMatrixScale(d)).clone().invert(),z=x.clone().multiply(O);_.copy(y).multiply(g).multiply(z).multiply(v)}const C=c.clone().invert(),A=r.clone().invert();let I=e.clone().multiply(l).multiply(c).multiply(t).multiply(n).multiply(i).multiply(C).multiply(a).multiply(r).multiply(s).multiply(A);const L=new ue().copyPosition(I),b=h.clone().multiply(L);return u.copyPosition(b),I=u.clone().multiply(_),I.premultiply(h.invert()),I}function xh(o){o=o||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return o===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[o]}function To(o){return o.split(",").map(function(t){return parseFloat(t)})}function _h(o,e,t){return e===void 0&&(e=0),t===void 0&&(t=o.byteLength),new TextDecoder().decode(new Uint8Array(o,e,t))}function pv(o,e){for(let t=0,n=o.length,i=e.length;t<i;t++,n++)o[n]=e[t]}function fv(o,e,t,n){for(let i=t,s=0;i<n;i++,s++)o[s]=e[i];return o}class mv{constructor(e){this.scene=e,this.mesh=null,this.mixer=null,this.animations={},this.currentAction=null,this.isMoving=!1,this.moveIntensity=0,this.heldItemMesh=null,this.heldItemContainer=null,this.debugTracerLine=null,this.preloadedAxeModel=null,this.preloadedAppleModel=null,this.isPlayingAxeAnimation=!1,this.axeHitAction=null}async load(){return new Promise((e,t)=>{new Cn().load("assets/Player_Model_New.glb",async i=>{this.mesh=i.scene,this.mesh.position.set(0,6.1,0),this.mesh.scale.setScalar(2.2),this.setupHeightSlider(),this.mesh.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.material&&(Array.isArray(s.material)?s.material.forEach(r=>{(r.isMeshStandardMaterial||r.isMeshPhysicalMaterial)&&(r.metalness=0,r.roughness=1)}):(s.material.isMeshStandardMaterial||s.material.isMeshPhysicalMaterial)&&(s.material.metalness=0,s.material.roughness=1)))}),this.mixer=new ah(this.mesh);try{await this.loadFBXAnimations()}catch(s){console.error("Failed to load FBX animations:",s),t(s);return}this.playAnimation("Player_Idle",!0),this.scene.add(this.mesh),this.createHeldItemContainer(),Promise.all([this.preloadAxeModel(),this.preloadAppleModel()]).then(()=>{e()}).catch(s=>{console.warn("Failed to preload some models, will load on demand:",s),e()})},i=>{},i=>{console.error("Error loading player model:",i),t(i)})})}async loadFBXAnimations(){await this.loadFBXAnimation("assets/Player_Idle.fbx","Player_Idle"),await Promise.all([this.loadFBXAnimation("assets/Player_Walking.fbx","Player_Walking"),this.loadFBXAnimation("assets/Player_Walking_Right.fbx","Player_Walking_Right"),this.loadFBXAnimation("assets/Player_Walking_Left.fbx","Player_Walking_Left"),this.loadFBXAnimation("assets/Player_Run.fbx","Player_Run"),this.loadFBXAnimation("assets/Player_Run_Right.fbx","Player_Run_Right"),this.loadFBXAnimation("assets/Player_Run_Left.fbx","Player_Run_Left"),this.loadFBXAnimation("assets/Item_Player_Axe_Hit.fbx","Player_Axe_Hit")])}async loadFBXAnimation(e,t){return new Promise((n,i)=>{new iv().load(e,r=>{if(r.animations&&r.animations.length>0){const a=r.animations[0];a.name=t;const l=this.mixer.clipAction(a);this.animations[t]=l,`${t}`}n()},r=>{},r=>{console.error(`Error loading ${t} FBX animation:`,r),i(r)})})}getAnimationName(e){const t=e.split("|");return t[t.length-1]||e}playAnimation(e,t=!1){if(!this.animations[e]){console.warn(`Animation ${e} not found`);return}this.currentAction&&this.currentAction.fadeOut(.2);const n=this.animations[e];n.reset(),n.setLoop(t?Pc:Po),n.fadeIn(.2),n.play(),this.currentAction=n}update(e,t,n){if(this.mixer&&this.mixer.update(e),this.updateHeldItemVisibility(),t){const i=Math.sqrt(t.velocity.x*t.velocity.x+t.velocity.z*t.velocity.z),s=this.isMoving;this.isMoving=i>.1;const r=t.isRunning?t.runSpeed:t.moveSpeed;this.moveIntensity=i/r;const a=new T().subVectors(n,this.mesh.position).normalize(),l=new T(0,0,-1).applyQuaternion(this.mesh.quaternion);l.dot(a)>0,Math.abs(l.dot(a));const c=t.keys.KeyD&&!t.keys.KeyA;if((t.keys.KeyA&&!t.keys.KeyD||c)&&!t.keys.KeyW&&t.keys.KeyS,t.keys.KeyW,t.keys.KeyS,this.isMoving){const d=t.isRunning?"Player_Run":"Player_Walking";(!this.currentAction||this.currentAction!==this.animations[d])&&this.playAnimation(d,!0)}else this.mesh.scale.x=Math.abs(this.mesh.scale.x),(s||!this.currentAction||this.currentAction!==this.animations.Player_Idle)&&this.playAnimation("Player_Idle",!0);if(this.currentAction){const d=this.currentAction===this.animations.Player_Walking||this.currentAction===this.animations.Player_Walking_Right||this.currentAction===this.animations.Player_Walking_Left,u=this.currentAction===this.animations.Player_Run||this.currentAction===this.animations.Player_Run_Right||this.currentAction===this.animations.Player_Run_Left;d?this.currentAction.setEffectiveTimeScale(.7+this.moveIntensity*.3):u&&this.currentAction.setEffectiveTimeScale(1)}}}createHeldItemContainer(){this.heldItemContainer=new Dt;let e=null;const t=["mixamorig:RightHand","mixamorig:LeftHand","mixamorigRightHand","mixamorigLeftHand","RightHand","LeftHand","Right_Hand","Left_Hand","hand_r","hand_l","hand.R","hand.L","HandR","HandL","RHand","LHand","Hand_R","Hand_L","hand.r","hand.l","R_Hand","L_Hand","RightHandBone","LeftHandBone","mixamorig:RightHandIndex1","mixamorig:LeftHandIndex1","mixamorigRightHandIndex1","mixamorigLeftHandIndex1","RightHandIndex1","LeftHandIndex1","mixamorig:RightForeArm","mixamorig:LeftForeArm","RightForeArm","LeftForeArm"],n=[];this.mesh&&this.mesh.traverse(i=>{if(i.isBone||i.type==="Bone"){n.push(i.name);for(const s of t)if(i.name===s){e=i;break}if(!e){const s=i.name.toLowerCase();(s.includes("hand")&&(s.includes("right")||s.includes("left")||s.includes("r")||s.includes("l"))||s.includes("righthand")||s.includes("lefthand")||s.includes("hand_r")||s.includes("hand_l")||s.includes("hand.r")||s.includes("hand.l"))&&(e=i),!e&&s.includes("hand")&&(e=i)}}}),this.mesh.add(this.heldItemContainer),this.heldItemContainer.position.set(.12,.85,.25),this.heldItemContainer.rotation.set(0,0,0),this.heldItemContainer.scale.set(1,1,1),this.handBone=e}updateHeldItem(e){if(this.heldItemMesh&&(this.heldItemContainer.remove(this.heldItemMesh),this.heldItemMesh=null),!e||!e.item)return;this.heldItemContainer||this.createHeldItemContainer();const t=e.item;let n,i;switch(t.name,t.type,t.type){case"weapon":t.id==="sword"?(n=new je(.1,.04,1.2),i=new We({color:12632256})):t.id==="bow"?(n=new je(.1,1.6,.04),i=new We({color:9127187})):(n=new je(.1,.1,.8),i=new We({color:6710886}));break;case"tool":if(t.id==="pickaxe")n=new je(.1,.04,1),i=new We({color:9127187});else if(t.id==="axe")if(this.preloadedAxeModel){this.heldItemMesh=this.preloadedAxeModel.clone(),this.heldItemMesh.castShadow=!0,this.heldItemMesh.receiveShadow=!0,this.heldItemMesh.userData.itemName=t.name,this.heldItemMesh.rotation.set(Math.PI,-35*Math.PI/180,-105*Math.PI/180),this.heldItemMesh.position.set(-.06,.02,.06),this.heldItemMesh.scale.set(.05,.05,.05),this.heldItemContainer.add(this.heldItemMesh);return}else console.warn("Axe model not preloaded, using fallback geometry"),n=new je(.1,.1,.8),i=new We({color:9127187});else n=new je(.1,.1,.8),i=new We({color:16750592});break;case"consumable":if(t.id==="apple")if(this.player,this.preloadedAppleModel,this.preloadedAppleModel){this.heldItemMesh=this.preloadedAppleModel.clone(),this.heldItemMesh.castShadow=!0,this.heldItemMesh.receiveShadow=!0,this.heldItemMesh.userData.itemName=t.name,this.heldItemMesh.scale.set(.15,.15,.15),this.heldItemMesh.position.set(.07,.11,0),this.heldItemMesh.rotation.set(180*Math.PI/180,135*Math.PI/180,40*Math.PI/180),this.heldItemContainer.add(this.heldItemMesh);return}else console.warn("Apple model not preloaded, using fallback geometry"),n=new qt(.16,12,8),i=new We({color:16729156});else t.id==="potion"?(n=new ln(.12,.12,.3,8),i=new We({color:5025616})):(n=new qt(.12,8,6),i=new We({color:5025616}));break;case"material":t.id==="wood"?(n=new je(.3,.1,.6),i=new We({color:9127187})):t.id==="stone"?(n=new qt(.16,8,6),i=new We({color:6908265})):t.id==="cube"?(n=new je(.24,.24,.24),i=new We({color:10395294})):(n=new je(.2,.2,.2),i=new We({color:10395294}));break;case"armor":n=new je(.24,.16,.24),i=new We({color:2201331});break;default:n=new je(.16,.16,.16),i=new We({color:6710886})}this.heldItemMesh=new Le(n,i),this.heldItemMesh.castShadow=!0,this.heldItemMesh.receiveShadow=!0,this.heldItemMesh.userData.itemName=t.name,t.type==="weapon"&&t.id==="sword"?(this.heldItemMesh.rotation.set(-Math.PI/4,0,Math.PI/12),this.heldItemMesh.position.set(.05,.02,.08)):t.type==="weapon"&&t.id==="bow"?(this.heldItemMesh.rotation.set(0,0,0),this.heldItemMesh.position.set(.03,0,.02)):t.type==="tool"&&t.id==="pickaxe"?(this.heldItemMesh.rotation.set(-Math.PI/3,0,Math.PI/8),this.heldItemMesh.position.set(.04,.02,.08)):t.type==="consumable"?t.id==="apple"?(this.heldItemMesh.position.set(.07,.11,0),this.heldItemMesh.rotation.set(180*Math.PI/180,135*Math.PI/180,40*Math.PI/180)):(this.heldItemMesh.position.set(.02,.01,.03),this.heldItemMesh.rotation.set(0,0,0)):t.type==="material"?(this.heldItemMesh.position.set(.03,.015,.04),this.heldItemMesh.rotation.set(Math.PI/12,0,0)):(this.heldItemMesh.position.set(.02,.01,.03),this.heldItemMesh.rotation.set(0,0,0)),this.heldItemContainer.add(this.heldItemMesh),this.heldItemContainer.children.length,this.heldItemMesh.position,this.heldItemContainer.getWorldPosition(new T),this.heldItemMesh.visible=!0,this.heldItemContainer.visible=!0,this.debugTracerLine||this.createDebugTracer()}createDebugTracer(){const e=[new T(0,0,0),new T(0,0,0)],t=new mt().setFromPoints(e),n=new Ln({color:16711680,linewidth:5});this.debugTracerLine=new ts(t,n),this.debugTracerLine.visible=!1,this.scene.add(this.debugTracerLine)}updateDebugTracer(){if(!this.debugTracerLine||!this.mesh)return;if(!this.heldItemMesh){this.debugTracerLine.visible=!1;return}this.debugTracerLine.visible=!0;const e=new T;e.copy(this.mesh.position),e.y+=1.2;const t=new T;this.heldItemMesh.getWorldPosition(t);const n=this.debugTracerLine.geometry.attributes.position;n.setXYZ(0,e.x,e.y,e.z),n.setXYZ(1,t.x,t.y,t.z),n.needsUpdate=!0,this.debugTracerLine.geometry.computeBoundingSphere(),this.debugTracerLine.visible}updateHeldItemVisibility(){if(this.heldItemContainer){if(this.heldItemContainer.visible=!0,this.heldItemContainer.traverse(e=>{e.isMesh&&(e.visible=!0)}),this.heldItemContainer.scale.set(1,1,1),this.handBone){const e=new T;this.handBone.getWorldPosition(e);const t=new T;this.mesh.worldToLocal(t.copy(e)),this.heldItemContainer.position.copy(t);const n=new ht;this.handBone.getWorldQuaternion(n);const i=new ht;this.mesh.getWorldQuaternion(i);const s=new ht;s.copy(n).premultiply(i.invert()),this.heldItemContainer.quaternion.copy(s)}if(this.handBone&&this.heldItemMesh&&Math.random()<.001){const e=new T;this.handBone.getWorldPosition(e),this.heldItemContainer.visible,this.heldItemMesh.visible}}this.updateHeldItemPositionDisplay()}updateHeldItemPositionDisplay(){const e=document.getElementById("itemCoords");if(!e)return;if(!this.handBone){e.innerHTML='<span style="color: #FFA500;">No hand bone found</span>';return}this.scene.updateWorldMatrix(!0,!0);let t=new T;this.handBone.getWorldPosition(t);let n=new T;this.mesh.getWorldPosition(n);let i=new T;i.subVectors(t,n);const s=this.handBone.name||"unknown";e.innerHTML=`
      <div style="margin-bottom: 8px;">
        <strong>Hand Bone World Position:</strong><br>
        X: ${t.x.toFixed(3)}, Y: ${t.y.toFixed(3)}, Z: ${t.z.toFixed(3)}
      </div>
      <div style="margin-bottom: 8px;">
        <strong>Relative to Player:</strong><br>
        X: ${i.x.toFixed(3)}, Y: ${i.y.toFixed(3)}, Z: ${i.z.toFixed(3)}
      </div>
      <small style="color: #888;">Bone: ${s}</small>
    `,this.updatePlayerCoordsDisplay()}setupHeightSlider(){const e=document.getElementById("playerHeightSlider"),t=document.getElementById("playerHeightValue");e&&t?(e.value="0.0",t.textContent="0.0",this.colliderOffset=0,e.addEventListener("input",n=>{const i=parseFloat(n.target.value);this.colliderOffset=i,t.textContent=i.toFixed(1),window.gameInstance&&window.gameInstance.characterController&&(window.gameInstance.characterController.colliderOffset=i)})):console.warn("Height slider elements not found")}updatePlayerCoordsDisplay(){const e=document.getElementById("playerCoords");if(!e||!this.mesh)return;const t=new T;this.mesh.getWorldPosition(t),e.textContent=`X: ${t.x.toFixed(3)}, Y: ${t.y.toFixed(3)}, Z: ${t.z.toFixed(3)}`}async preloadAxeModel(){try{const e=new Cn;return new Promise((t,n)=>{e.load("assets/axe.glb",i=>{this.preloadedAxeModel=i.scene,this.preloadedAxeModel.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),t(this.preloadedAxeModel)},i=>{},i=>{console.error("Error preloading axe model:",i),n(i)})})}catch(e){throw console.error("Failed to create axe model preloader:",e),e}}async loadAxeModel(){try{const e=new Cn;return new Promise((t,n)=>{e.load("assets/axe.glb",i=>{const s=i.scene.clone();s.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0)}),t(s)},i=>{},i=>{console.error("Error loading axe model:",i),n(i)})})}catch(e){throw console.error("Failed to create axe model loader:",e),e}}async loadAppleModel(){try{const e=new Cn;return new Promise((t,n)=>{e.load("assets/apple.glb",i=>{const s=i.scene.clone();s.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0,r.material&&(Array.isArray(r.material)?r.material.forEach(a=>{(a.isMeshStandardMaterial||a.isMeshPhysicalMaterial)&&(a.metalness=0,a.roughness=1)}):(r.material.isMeshStandardMaterial||r.material.isMeshPhysicalMaterial)&&(r.material.metalness=0,r.material.roughness=1)))}),t(s)},i=>{},i=>{console.error("Error loading apple model:",i),n(i)})})}catch(e){throw console.error("Failed to create apple model loader:",e),e}}async preloadAppleModel(){try{const e=new Cn;return new Promise((t,n)=>{e.load("assets/apple.glb",i=>{this.preloadedAppleModel=i.scene,this.preloadedAppleModel.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.material&&(Array.isArray(s.material)?s.material.forEach(r=>{(r.isMeshStandardMaterial||r.isMeshPhysicalMaterial)&&(r.metalness=0,r.roughness=1)}):(s.material.isMeshStandardMaterial||s.material.isMeshPhysicalMaterial)&&(s.material.metalness=0,s.material.roughness=1)))}),t(this.preloadedAppleModel)},i=>{},i=>{console.error("Error preloading apple model:",i),n(i)})})}catch(e){throw console.error("Failed to create apple model preloader:",e),e}}playAxeHitAnimation(){if(this.isPlayingAxeAnimation)return!1;if(!this.animations.Player_Axe_Hit)return console.warn("Axe hit animation not found"),!1;this.isPlayingAxeAnimation=!0,this.currentAction&&this.currentAction.fadeOut(.1);const e=this.animations.Player_Axe_Hit;e.reset(),e.setLoop(Po),e.clampWhenFinished=!0,e.fadeIn(.1),e.play(),this.axeHitAction=e;const t=this.mixer,n=i=>{if(i.action===e){if(this.isPlayingAxeAnimation=!1,this.axeHitAction=null,e.fadeOut(.2),this.isMoving){const s=this.moveIntensity>.7?"Player_Run":"Player_Walking";this.animations[s]&&this.playAnimation(s,!0)}else this.playAnimation("Player_Idle",!0);t.removeEventListener("finished",n)}};return t.addEventListener("finished",n),!0}canPerformAxeHit(){return!this.isPlayingAxeAnimation}}class pn{constructor(e,t,n,i,s=1,r=""){this.id=e,this.name=t,this.type=n,this.icon=i,this.stackSize=s,this.description=r}}class ui{constructor(e,t=1){this.item=e,this.quantity=Math.min(t,e.stackSize)}canAddItem(e,t=1){return this.item.id===e.id&&this.quantity+t<=this.item.stackSize}addQuantity(e){const t=this.item.stackSize-this.quantity,n=Math.min(e,t);return this.quantity+=n,e-n}removeQuantity(e){const t=Math.min(e,this.quantity);return this.quantity-=t,t}isEmpty(){return this.quantity<=0}clone(){return new ui(this.item,this.quantity)}}class gv{constructor(){this.hotbarSize=9,this.backpackRows=6,this.backpackCols=9,this.backpackSize=this.backpackRows*this.backpackCols,this.hotbar=new Array(this.hotbarSize).fill(null),this.backpack=new Array(this.backpackSize).fill(null),this.selectedHotbarSlot=0,this.onInventoryChange=null,this.onHotbarSelectionChange=null,this.onItemAdded=null}addItem(e,t=1){`${t}${e.name||e.id}`,`${this.getItemCount(e.id)}`;let n=t;for(let s=0;s<this.hotbar.length&&n>0;s++){const r=this.hotbar[s];r&&r.canAddItem(e,n)&&(`${s}${r.quantity}${r.item.id}`,r.quantity,n=r.addQuantity(n),r.quantity)}for(let s=0;s<this.backpack.length&&n>0;s++){const r=this.backpack[s];r&&r.canAddItem(e,n)&&(`${s}${r.quantity}${r.item.id}`,r.quantity,n=r.addQuantity(n),r.quantity)}for(;n>0;){const s=Math.min(n,e.stackSize);`${s}${e.id}${n}`;const r=new ui(e,s);let a=!1;for(let l=0;l<this.hotbar.length;l++)if(!this.hotbar[l]){this.hotbar[l]=r,`${l}${s}${e.id}`,a=!0;break}if(!a){for(let l=0;l<this.backpack.length;l++)if(!this.backpack[l]){this.backpack[l]=r,`${l}${s}${e.id}`,a=!0;break}}if(!a){console.warn("Inventory full! Could not add item:",e.name);break}n-=s}const i=t-n;if(`${this.getItemCount(e.id)}`,i>0&&this.onItemAdded){const s=this.getItemCount(e.id);this.onItemAdded(e,i,s)}return this.notifyChange(),i}removeItem(e,t=1){let n=t;for(let i=0;i<this.hotbar.length&&n>0;i++){const s=this.hotbar[i];if(s&&s.item.id===e){const r=s.removeQuantity(n);n-=r,s.isEmpty()&&(this.hotbar[i]=null)}}for(let i=0;i<this.backpack.length&&n>0;i++){const s=this.backpack[i];if(s&&s.item.id===e){const r=s.removeQuantity(n);n-=r,s.isEmpty()&&(this.backpack[i]=null)}}return this.notifyChange(),t-n}getSelectedItem(){return this.hotbar[this.selectedHotbarSlot]}selectHotbarSlot(e){e>=0&&e<this.hotbarSize&&(this.selectedHotbarSlot=e,this.onHotbarSelectionChange&&this.onHotbarSelectionChange(e,this.getSelectedItem()))}moveItem(e,t,n,i){const s=e==="hotbar"?this.hotbar:this.backpack,r=n==="hotbar"?this.hotbar:this.backpack,a=s[t],l=r[i];if(!a)return!1;if(!l)return r[i]=a,s[t]=null,this.notifyChange(),!0;if(l.canAddItem(a.item,a.quantity)){const c=l.addQuantity(a.quantity);return c===0?s[t]=null:a.quantity=c,this.notifyChange(),!0}return r[i]=a,s[t]=l,this.notifyChange(),!0}getItemCount(e){let t=0;for(const n of this.hotbar)n&&n.item.id===e&&(t+=n.quantity);for(const n of this.backpack)n&&n.item.id===e&&(t+=n.quantity);return t}hasItem(e,t=1){return this.getItemCount(e)>=t}notifyChange(){this.onInventoryChange&&this.onInventoryChange()}serialize(){return{hotbar:this.hotbar.map(e=>e?{itemId:e.item.id,quantity:e.quantity}:null),backpack:this.backpack.map(e=>e?{itemId:e.item.id,quantity:e.quantity}:null),selectedHotbarSlot:this.selectedHotbarSlot}}deserialize(e,t){if(this.hotbar.fill(null),this.backpack.fill(null),e.hotbar)for(let n=0;n<e.hotbar.length;n++){const i=e.hotbar[n];i&&t[i.itemId]&&(this.hotbar[n]=new ui(t[i.itemId],i.quantity))}if(e.backpack)for(let n=0;n<e.backpack.length;n++){const i=e.backpack[n];i&&t[i.itemId]&&(this.backpack[n]=new ui(t[i.itemId],i.quantity))}e.selectedHotbarSlot!==void 0&&(this.selectedHotbarSlot=e.selectedHotbarSlot),this.notifyChange()}}class yv{constructor(e,t=null){this.inventory=e,this.player=t,this.isBackpackOpen=!1,this.draggedItem=null,this.draggedSlot=null,this.previewScene=null,this.previewCamera=null,this.previewRenderer=null,this.previewMesh=null,this.currentPreviewItem=null,this.pickupPopups=[],this.draggedElement=null,this.draggedData=null,this.createUI(),this.setupEventListeners(),this.updateUI()}createUI(){this.createHotbar(),this.createBackpack(),this.createPreviewPanel(),this.createBuildPrompt(),this.createStyles()}createStyles(){const e=document.createElement("style");e.textContent=`
      @import url('/assets/external/fonts.googleapis.com/css2__qs_family_Fredoka_One_wght_400_family_Nunito_wght_400_600_700_display_swap.css');
      
      .inventory-ui {
        font-family: 'Nunito', sans-serif;
        user-select: none;
        pointer-events: auto;
      }
      .hotbar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 1000;
        background: linear-gradient(145deg, #8B4513, #A0522D);
        padding: 12px 16px;
        border-radius: 25px;
        box-shadow: 
          0 8px 32px rgba(139, 69, 19, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.2);
        border: 3px solid #D2691E;
      }
      .hotbar-slot {
        width: 55px;
        height: 55px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 3px solid #CD853F;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          0 4px 12px rgba(139, 69, 19, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.6),
          inset 0 -2px 4px rgba(0, 0, 0, 0.1);
      }
      .hotbar-slot:hover {
        transform: translateY(-2px) scale(1.05);
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        box-shadow: 
          0 6px 20px rgba(139, 69, 19, 0.4),
          inset 0 2px 6px rgba(255, 255, 255, 0.7),
          inset 0 -3px 6px rgba(0, 0, 0, 0.1);
      }
      .hotbar-slot.selected {
        background: linear-gradient(145deg, #98FB98, #90EE90);
        border-color: #32CD32;
        box-shadow: 
          0 0 20px rgba(50, 205, 50, 0.6),
          0 8px 25px rgba(139, 69, 19, 0.4),
          inset 0 2px 6px rgba(255, 255, 255, 0.8);
        animation: cozyGlow 2s ease-in-out infinite alternate;
      }
      @keyframes cozyGlow {
        from { box-shadow: 0 0 15px rgba(50, 205, 50, 0.4), 0 8px 25px rgba(139, 69, 19, 0.4), inset 0 2px 6px rgba(255, 255, 255, 0.8); }
        to { box-shadow: 0 0 25px rgba(50, 205, 50, 0.8), 0 8px 25px rgba(139, 69, 19, 0.4), inset 0 2px 6px rgba(255, 255, 255, 0.8); }
      }

      .slot-number {
        position: absolute;
        top: -12px;
        left: -8px;
        font-size: 12px;
        color: #8B4513;
        font-weight: 700;
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border: 2px solid #CD853F;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka One', cursive;
        box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3);
      }
      .item-icon {
        width: 36px;
        height: 36px;
        background: linear-gradient(145deg, #F5F5DC, #E6E6FA);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        line-height: 1;
        box-shadow: 
          0 2px 8px rgba(0, 0, 0, 0.2),
          inset 0 1px 2px rgba(255, 255, 255, 0.5);
        transition: transform 0.2s ease;
      }
      .item-icon:hover {
        transform: scale(1.1);
      }
      .item-quantity {
        position: absolute;
        bottom: -5px;
        right: -5px;
        background: linear-gradient(145deg, #FF6B6B, #FF8E8E);
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 12px;
        min-width: 16px;
        text-align: center;
        border: 2px solid #FF4444;
        box-shadow: 0 2px 8px rgba(255, 75, 75, 0.4);
        font-family: 'Fredoka One', cursive;
      }

      .backpack-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, rgba(139, 69, 19, 0.8), rgba(160, 82, 45, 0.9));
        display: none;
        z-index: 2000;
        backdrop-filter: blur(8px);
      }
      .backpack-overlay.visible {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .backpack-container {
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 4px solid #8B4513;
        border-radius: 25px;
        padding: 25px;
        min-width: 520px;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        box-shadow: 
          0 20px 60px rgba(139, 69, 19, 0.6),
          inset 0 4px 8px rgba(255, 255, 255, 0.3),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
        position: relative;
      }
      .backpack-container::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #CD853F, #D2691E, #B8860B, #DAA520);
        border-radius: 27px;
        z-index: -1;
      }
      .backpack-container::-webkit-scrollbar {
        display: none;
      }
      .item-preview-panel {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 340px;
        height: 80vh;
        max-height: 600px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 4px solid #8B4513;
        border-radius: 25px;
        padding: 20px;
        box-shadow: 
          0 20px 60px rgba(139, 69, 19, 0.6),
          inset 0 4px 8px rgba(255, 255, 255, 0.3),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        opacity: 0;
        visibility: hidden;
        z-index: 2100;
      }
      .item-preview-panel::-webkit-scrollbar {
        display: none;
      }
      .item-preview-panel.visible {
        opacity: 1;
        visibility: visible;
      }
      .preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        color: #8B4513;
      }
      .preview-title {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Fredoka One', cursive;
        text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.3);
      }
      .preview-close {
        background: linear-gradient(145deg, #FF6B6B, #FF8E8E);
        border: 2px solid #FF4444;
        color: #fff;
        padding: 8px 12px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .preview-close:hover {
        transform: scale(1.05);
        background: linear-gradient(145deg, #FF8E8E, #FFB6B6);
      }
      .preview-3d-container {
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
        border: 3px solid #DEB887;
        border-radius: 20px;
        margin-bottom: 20px;
        position: relative;
        overflow: hidden;
        box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      .item-details {
        color: #8B4513;
      }
      .item-name {
        font-size: 18px;
        font-weight: 700;
        font-family: 'Fredoka One', cursive;
        margin-bottom: 8px;
        color: #8B4513;
      }
      .item-type {
        font-size: 14px;
        color: #A0522D;
        margin-bottom: 12px;
        font-weight: 600;
        text-transform: capitalize;
      }
      .item-description {
        font-size: 14px;
        line-height: 1.5;
        color: #8B4513;
        margin-bottom: 16px;
        background: rgba(222, 184, 135, 0.3);
        padding: 12px;
        border-radius: 15px;
        border: 2px solid rgba(160, 82, 45, 0.3);
      }
      .item-stats {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: rgba(245, 222, 179, 0.4);
        border-radius: 12px;
        border: 1px solid rgba(160, 82, 45, 0.3);
      }
      .stat-label {
        font-weight: 600;
        color: #8B4513;
      }
      .stat-value {
        font-weight: 700;
        color: #A0522D;
      }
      .backpack-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        color: #8B4513;
      }
      .backpack-title {
        font-size: 28px;
        font-weight: 700;
        font-family: 'Fredoka One', cursive;
        text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);
        background: linear-gradient(45deg, #8B4513, #A0522D);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .close-button {
        background: linear-gradient(145deg, #FF6B6B, #FF8E8E);
        border: 3px solid #FF4444;
        color: #fff;
        padding: 12px 20px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        font-family: 'Nunito', sans-serif;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          0 4px 15px rgba(255, 75, 75, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3);
      }
      .close-button:hover {
        transform: translateY(-2px) scale(1.05);
        background: linear-gradient(145deg, #FF8E8E, #FFB6B6);
        box-shadow: 
          0 6px 20px rgba(255, 75, 75, 0.6),
          inset 0 2px 6px rgba(255, 255, 255, 0.4);
      }

      .inventory-sections {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .section-title {
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .hotbar-section {
        display: flex;
        gap: 4px;
        justify-content: center;
      }

      .backpack-grid {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        gap: 4px;
        max-width: 500px;
      }

      .inventory-slot {
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .inventory-slot:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
      }

      .inventory-slot.drag-over {
        border-color: #2196F3;
        background: rgba(33, 150, 243, 0.2);
      }

      .dragging {
        opacity: 0.5;
        transform: scale(0.95);
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .hotbar {
          bottom: 80px;
          padding: 6px;
        }

        .hotbar-slot {
          width: 40px;
          height: 40px;
        }

        .item-icon {
          width: 28px;
          height: 28px;
          font-size: 14px;
        }

        .backpack-container {
          min-width: auto;
          width: 95vw;
          padding: 15px;
        }

        .backpack-grid {
          grid-template-columns: repeat(6, 1fr);
          max-width: none;
        }
        .inventory-slot {
          width: 45px;
          height: 45px;
        }
        .item-preview-panel {
          position: fixed;
          right: 10px;
          top: 10px;
          width: calc(100vw - 20px);
          max-width: 320px;
          height: auto;
          max-height: 70vh;
          transform: none;
        }
      }
      .pickup-popup {
        position: fixed;
        bottom: 20px;
        right: 20px;
        transform: translateX(100%);
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 3px solid #8B4513;
        border-radius: 20px;
        padding: 20px 25px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 
          0 10px 30px rgba(139, 69, 19, 0.6),
          inset 0 2px 4px rgba(255, 255, 255, 0.3),
          inset 0 -2px 4px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        pointer-events: none;
        opacity: 0;
        animation: pickupSlideIn 0.3s ease-out forwards, pickupSlideOut 0.3s ease-in 2.7s forwards;
      }
      @keyframes pickupSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
      @keyframes pickupSlideOut {
        from {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateX(100%) scale(0.9);
        }
      }
      .pickup-popup .item-icon {
        width: 48px;
        height: 48px;
        font-size: 24px;
        border-radius: 15px;
        box-shadow: 
          0 4px 12px rgba(0, 0, 0, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.5);
      }
      .pickup-details {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .pickup-item-name {
        font-size: 16px;
        font-weight: 700;
        color: #8B4513;
        font-family: 'Fredoka One', cursive;
      }
      .pickup-item-quantity {
        font-size: 14px;
        color: #A0522D;
        font-weight: 600;
      }
      .pickup-plus-sign {
        font-size: 20px;
        color: #32CD32;
        font-weight: bold;
        margin-right: 5px;
      }
      @media (max-width: 768px) {
        .pickup-popup {
          padding: 15px 20px;
          gap: 12px;
          bottom: 100px;
          right: 10px;
        }
        .pickup-popup .item-icon {
          width: 40px;
          height: 40px;
          font-size: 20px;
        }
        .pickup-item-name {
          font-size: 14px;
        }
        .pickup-item-quantity {
          font-size: 12px;
        }
      }
      
      /* World Item Pickup UI Styling */
      .world-pickup-prompt {
        position: absolute;
        background: rgba(255, 255, 255, 0.95);
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        padding: 8px 12px;
        color: #333;
        font-family: 'Nunito', sans-serif;
        font-size: 13px;
        font-weight: 600;
        text-align: center;
        pointer-events: none;
        z-index: 1500;
        white-space: nowrap;
        transform: translateX(-50%) translateY(-100%);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(4px);
      }
      
      .pickup-key {
        display: inline-block;
        background: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 2px 6px;
        margin: 0 2px;
        font-family: 'Nunito', sans-serif;
        font-size: 11px;
        font-weight: 700;
        color: #555;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .pickup-item-name {
        color: #666;
        font-weight: 600;
        margin-left: 2px;
      }
      
      /* Mobile responsive for pickup prompts */
      @media (max-width: 768px) {
        .world-pickup-prompt {
          font-size: 12px;
          padding: 8px 14px;
          border-radius: 15px;
        }
        
        .pickup-key {
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 6px;
        }
      }
      
      .build-prompt {
        position: fixed;
        bottom: 115px; /* Positioned above the hotbar */
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        color: #8B4513;
        padding: 10px 20px;
        border-radius: 20px;
        font-family: 'Nunito', sans-serif;
        font-size: 15px;
        font-weight: 700;
        z-index: 998; /* Below hotbar but above most things */
        display: flex;
        align-items: center;
        gap: 8px;
        border: 3px solid #CD853F;
        box-shadow: 
          0 6px 20px rgba(139, 69, 19, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.5),
          inset 0 -2px 4px rgba(0, 0, 0, 0.1);
        transition: opacity 0.3s ease, transform 0.3s ease;
        animation: pulse 2s infinite ease-in-out;
      }
      
      @keyframes pulse {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.03); }
        100% { transform: translateX(-50%) scale(1); }
      }
      
      .build-prompt .pickup-key {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border: 2px solid #CD853F;
        border-radius: 8px;
        padding: 4px 8px;
        font-family: 'Fredoka One', cursive;
        font-size: 12px;
        font-weight: 400;
        color: #8B4513;
        box-shadow: 0 2px 5px rgba(139, 69, 19, 0.2);
      }
      
      @media (max-width: 768px) {
        .build-prompt {
            bottom: 140px; /* Position above hotbar on mobile */
            left: 50%;
            transform: translateX(-50%);
            padding: 8px 16px;
            font-size: 13px;
        }
        
        @keyframes pulse {
          0% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.03); }
          100% { transform: translateX(-50%) scale(1); }
        }
      }
    `,document.head.appendChild(e)}createHotbar(){this.hotbarElement=document.createElement("div"),this.hotbarElement.className="inventory-ui hotbar";for(let e=0;e<this.inventory.hotbarSize;e++){const t=this.createSlot("hotbar",e);t.classList.add("hotbar-slot");const n=document.createElement("div");n.className="slot-number",n.textContent=(e+1).toString(),t.appendChild(n),this.hotbarElement.appendChild(t)}document.body.appendChild(this.hotbarElement)}createBuildPrompt(){this.buildPromptElement=document.createElement("div"),this.buildPromptElement.className="build-prompt",this.buildPromptElement.id="build-mode-prompt",this.buildPromptElement.innerHTML='Build Mode <span class="pickup-key">V</span>',document.body.appendChild(this.buildPromptElement)}createBackpack(){this.overlayElement=document.createElement("div"),this.overlayElement.className="backpack-overlay",this.backpackElement=document.createElement("div"),this.backpackElement.className="backpack-container";const e=document.createElement("div");e.className="backpack-header";const t=document.createElement("div");t.className="backpack-title",t.textContent="Inventory";const n=document.createElement("button");n.className="close-button",n.textContent="Close",n.onclick=()=>this.closeBackpack(),e.appendChild(t),e.appendChild(n);const i=document.createElement("div");i.className="inventory-sections";const s=document.createElement("div"),r=document.createElement("div");r.className="section-title",r.textContent="Hotbar";const a=document.createElement("div");a.className="hotbar-section";for(let d=0;d<this.inventory.hotbarSize;d++){const u=this.createSlot("hotbar",d);u.classList.add("inventory-slot"),a.appendChild(u)}s.appendChild(r),s.appendChild(a);const l=document.createElement("div"),c=document.createElement("div");c.className="section-title",c.textContent="Backpack";const h=document.createElement("div");h.className="backpack-grid";for(let d=0;d<this.inventory.backpackSize;d++){const u=this.createSlot("backpack",d);u.classList.add("inventory-slot"),h.appendChild(u)}l.appendChild(c),l.appendChild(h),i.appendChild(s),i.appendChild(l),this.backpackElement.appendChild(e),this.backpackElement.appendChild(i),this.overlayElement.appendChild(this.backpackElement),document.body.appendChild(this.overlayElement)}createPreviewPanel(){this.previewPanel=document.createElement("div"),this.previewPanel.className="item-preview-panel";const e=document.createElement("div");e.className="preview-header";const t=document.createElement("div");t.className="preview-title",t.textContent="Item Details";const n=document.createElement("button");n.className="preview-close",n.textContent="×",n.onclick=()=>this.closePreview(),e.appendChild(t),e.appendChild(n);const i=document.createElement("div");i.className="preview-3d-container",i.id="item-preview-3d";const s=document.createElement("div");s.className="item-details",s.id="item-details-content",this.previewPanel.appendChild(e),this.previewPanel.appendChild(i),this.previewPanel.appendChild(s),document.body.appendChild(this.previewPanel)}createSlot(e,t){const n=document.createElement("div");return n.dataset.container=e,n.dataset.index=t,n.draggable=!1,n}setupEventListeners(){document.addEventListener("keydown",e=>{if(e.code>="Digit1"&&e.code<="Digit9"){const t=parseInt(e.code.replace("Digit",""))-1;t<this.inventory.hotbarSize&&(this.inventory.selectHotbarSlot(t),this.updateUI())}(e.code==="KeyB"||e.code==="Tab")&&(e.preventDefault(),this.toggleBackpack()),e.code==="Escape"&&this.isBackpackOpen&&this.closeBackpack()}),document.addEventListener("click",e=>{const t=e.target.closest("[data-container][data-index]");if(t){const n=t.dataset.container,i=parseInt(t.dataset.index);if(n==="hotbar"&&(this.inventory.selectHotbarSlot(i),this.updateUI()),this.isBackpackOpen){const s=this.getSlotItem(n,i);s&&s.item&&this.showItemPreview(s.item)}}}),this.setupDragAndDrop(),this.inventory.onInventoryChange=()=>this.updateUI(),this.inventory.onHotbarSelectionChange=()=>this.updateUI(),this.inventory.onItemAdded=(e,t,n)=>this.showPickupPopup(e,t,n)}getSlotItem(e,t){return(e==="hotbar"?this.inventory.hotbar:this.inventory.backpack)[t]}setupDragAndDrop(){this.draggedElement=null,this.draggedData=null;let e=0,t=0;document.addEventListener("mousedown",n=>{const i=n.target.closest("[data-container][data-index]");if(!i)return;const s=i.dataset.container,r=parseInt(i.dataset.index),a=this.getSlotItem(s,r);a&&(n.preventDefault(),this.draggedData={container:s,index:r,itemStack:a},this.draggedElement=this.createDragElement(a),e=n.clientX-i.getBoundingClientRect().left,t=n.clientY-i.getBoundingClientRect().top,this.draggedElement.style.left=n.clientX-e+"px",this.draggedElement.style.top=n.clientY-t+"px",i.classList.add("dragging"),document.body.appendChild(this.draggedElement))}),document.addEventListener("mousemove",n=>{if(!this.draggedElement)return;this.draggedElement.style.left=n.clientX-e+"px",this.draggedElement.style.top=n.clientY-t+"px";const i=n.target.closest("[data-container][data-index]");document.querySelectorAll(".drag-over").forEach(s=>s.classList.remove("drag-over")),i&&i!==this.draggedElement&&i.classList.add("drag-over")}),document.addEventListener("mouseup",n=>{if(!this.draggedElement||!this.draggedData)return;const i=n.target.closest("[data-container][data-index]");if(i){const s=i.dataset.container,r=parseInt(i.dataset.index);(this.draggedData.container!==s||this.draggedData.index!==r)&&this.inventory.moveItem(this.draggedData.container,this.draggedData.index,s,r)}this.cleanupDrag()}),document.addEventListener("dragstart",n=>{n.preventDefault()})}createDragElement(e){const t=document.createElement("div");t.style.cssText=`
      position: fixed;
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 3000;
      backdrop-filter: blur(5px);
    `;const n=document.createElement("div");n.className="item-icon";const i=this.getItemIcon(e.item);if(n.innerHTML=i.icon,n.style.backgroundColor=i.color,t.appendChild(n),e.quantity>1){const s=document.createElement("div");s.className="item-quantity",s.textContent=e.quantity.toString(),t.appendChild(s)}return t}cleanupDrag(){this.draggedElement&&(this.draggedElement.remove(),this.draggedElement=null),document.querySelectorAll(".dragging").forEach(e=>e.classList.remove("dragging")),document.querySelectorAll(".drag-over").forEach(e=>e.classList.remove("drag-over")),this.draggedData=null}updateUI(){this.updateHotbar(),this.isBackpackOpen&&this.updateBackpack()}updateHotbar(){this.hotbarElement.querySelectorAll(".hotbar-slot").forEach((t,n)=>{const i=this.inventory.hotbar[n];this.updateSlotDisplay(t,i),n===this.inventory.selectedHotbarSlot?t.classList.add("selected"):t.classList.remove("selected")})}updateBackpack(){this.backpackElement.querySelectorAll(".hotbar-section .inventory-slot").forEach((n,i)=>{const s=this.inventory.hotbar[i];this.updateSlotDisplay(n,s)}),this.backpackElement.querySelectorAll(".backpack-grid .inventory-slot").forEach((n,i)=>{const s=this.inventory.backpack[i];this.updateSlotDisplay(n,s)})}updateSlotDisplay(e,t){const n=e.querySelector(".item-icon"),i=e.querySelector(".item-quantity");if(n&&n.remove(),i&&i.remove(),t&&t.item){const s=document.createElement("div");s.className="item-icon";const r=this.getItemIcon(t.item);if(s.innerHTML=r.icon,s.style.backgroundColor=r.color,e.appendChild(s),t.quantity>1){const a=document.createElement("div");a.className="item-quantity",a.textContent=t.quantity.toString(),e.appendChild(a)}e.title=`${t.item.name}
${t.item.description}`}else e.title=""}getItemIcon(e){const t={wood:{icon:"🪵",color:"#8B4513"},stone:{icon:"🪨",color:"#696969"},iron_ore:{icon:"⛰️",color:"#708090"},coal:{icon:"⚫",color:"#2F4F4F"},apple:{icon:"🍎",color:"#FF4500"},bread:{icon:"🍞",color:"#DEB887"},water:{icon:"💧",color:"#1E90FF"},potion:{icon:"🧪",color:"#9370DB"},sword:{icon:"⚔️",color:"#C0C0C0"},axe:{icon:"🪓",color:"#8B4513"},pickaxe:{icon:"⛏️",color:"#696969"},bow:{icon:"🏹",color:"#8B4513"},shield:{icon:"🛡️",color:"#4682B4"},helmet:{icon:"⛑️",color:"#4682B4"},chestplate:{icon:"🦺",color:"#4682B4"},boots:{icon:"🥾",color:"#8B4513"},ring:{icon:"💍",color:"#FFD700"},key:{icon:"🗝️",color:"#FFD700"},rope:{icon:"🪢",color:"#DEB887"},torch:{icon:"🔦",color:"#FF6347"},coin:{icon:"🪙",color:"#FFD700"},gem:{icon:"💎",color:"#00CED1"},scroll:{icon:"📜",color:"#F5DEB3"},book:{icon:"📚",color:"#8B4513"},feather:{icon:"🪶",color:"#F0E68C"},bone:{icon:"🦴",color:"#F5F5DC"},leather:{icon:"🧳",color:"#8B4513"},cloth:{icon:"🧵",color:"#F0F8FF"},arrow:{icon:"➡️",color:"#8B4513"},fishing_rod:{icon:"🎣",color:"#8B4513"},fish:{icon:"🐟",color:"#4682B4"},meat:{icon:"🥩",color:"#8B0000"},seed:{icon:"🌱",color:"#228B22"},flower:{icon:"🌸",color:"#FF69B4"},mushroom:{icon:"🍄",color:"#8B4513"}};return t[e.id]?t[e.id]:{tool:{icon:"🔧",color:"#FF9800"},weapon:{icon:"⚔️",color:"#F44336"},consumable:{icon:"🍯",color:"#4CAF50"},material:{icon:"📦",color:"#9E9E9E"},armor:{icon:"🛡️",color:"#2196F3"}}[e.type]||{icon:"❓",color:"#666"}}getItemColor(e){return{tool:"#FF9800",weapon:"#F44336",consumable:"#4CAF50",material:"#9E9E9E",armor:"#2196F3"}[e]||"#666"}toggleBackpack(){this.isBackpackOpen?this.closeBackpack():this.openBackpack()}openBackpack(){this.isBackpackOpen=!0,this.overlayElement.classList.add("visible"),this.updateBackpack(),document.body.style.overflow="hidden"}closeBackpack(){this.isBackpackOpen=!1,this.overlayElement.classList.remove("visible"),this.closePreview(),document.body.style.overflow=""}async showItemPreview(e){this.currentPreviewItem=e,this.previewPanel.classList.add("visible"),this.updateItemDetails(e),await this.setup3DPreview(e)}closePreview(){if(this.previewPanel.classList.remove("visible"),this.currentPreviewItem=null,this.previewRenderer){const e=document.getElementById("item-preview-3d");e&&this.previewRenderer.domElement&&e.removeChild(this.previewRenderer.domElement),this.previewRenderer.dispose(),this.previewRenderer=null}this.previewScene=null,this.previewCamera=null,this.previewMesh=null}updateItemDetails(e){const t=document.getElementById("item-details-content");t.innerHTML=`
      <div class="item-name">${e.name}</div>
      <div class="item-type">${e.type}</div>
      <div class="item-description">${e.description||"No description available."}</div>
      <div class="item-stats">
        ${e.durability!==void 0?`
          <div class="stat-row">
            <span class="stat-label">Durability</span>
            <span class="stat-value">${e.durability}/${e.maxDurability||e.durability}</span>
          </div>
        `:""}
        ${e.damage!==void 0?`
          <div class="stat-row">
            <span class="stat-label">Damage</span>
            <span class="stat-value">${e.damage}</span>
          </div>
        `:""}
        ${e.defense!==void 0?`
          <div class="stat-row">
            <span class="stat-label">Defense</span>
            <span class="stat-value">${e.defense}</span>
          </div>
        `:""}
        ${e.weight!==void 0?`
          <div class="stat-row">
            <span class="stat-label">Weight</span>
            <span class="stat-value">${e.weight}</span>
          </div>
        `:""}
        ${e.value!==void 0?`
          <div class="stat-row">
            <span class="stat-label">Value</span>
            <span class="stat-value">${e.value} gold</span>
          </div>
        `:""}
      </div>
    `}async setup3DPreview(e){const t=document.getElementById("item-preview-3d");this.previewRenderer&&(t.removeChild(this.previewRenderer.domElement),this.previewRenderer.dispose()),this.previewScene=new Rr,this.previewScene.background=new ce(2889744),this.previewCamera=new _t(50,t.clientWidth/t.clientHeight,.1,1e3),this.previewCamera.position.set(0,0,2.5),this.previewRenderer=new As({antialias:!0}),this.previewRenderer.setSize(t.clientWidth,t.clientHeight),this.previewRenderer.shadowMap.enabled=!0,this.previewRenderer.shadowMap.type=qo,t.appendChild(this.previewRenderer.domElement);const n=new Rs(16777215,.4);this.previewScene.add(n);const i=new xi(16777215,.8);i.position.set(2,2,2),i.castShadow=!0,this.previewScene.add(i),await this.create3DItem(e),this.animate3DPreview()}fitModelToPreview(e,t=1.5){const n=new Yt().setFromObject(e),i=n.getSize(new T),s=Math.max(i.x,i.y,i.z),r=t/s;e.scale.setScalar(r);const a=n.getCenter(new T);return e.position.sub(a.multiplyScalar(r)),r}async create3DItem(e){let t,n,i;switch(e.type){case"weapon":if(e.id==="sword")t=new ln(.02,.02,1.5,8),n=new Gt({color:12632256});else if(e.id==="axe")if(this.player,this.player?.preloadedAxeModel,this.player&&this.player.preloadedAxeModel){i=this.player.preloadedAxeModel.clone(),this.fitModelToPreview(i),i.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),this.previewScene.add(i),this.previewMesh=i;return}else console.warn("Preloaded axe model not available, using fallback geometry"),console.warn("Player exists:",!!this.player),console.warn("Preloaded model exists:",!!(this.player&&this.player.preloadedAxeModel)),t=new je(.6,.1,.8),n=new Gt({color:9127187});else t=new je(.2,1,.1),n=new Gt({color:9127187});break;case"tool":if(e.id==="axe")if(this.player,this.player?.preloadedAxeModel,this.player&&this.player.preloadedAxeModel){i=this.player.preloadedAxeModel.clone(),this.fitModelToPreview(i),i.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),this.previewScene.add(i),this.previewMesh=i;return}else console.warn("Preloaded axe model not available, using fallback geometry"),console.warn("Player exists:",!!this.player),console.warn("Preloaded model exists:",!!(this.player&&this.player.preloadedAxeModel)),t=new je(.3,.8,.1),n=new Gt({color:9127187});else t=new je(.3,.8,.1),n=new Gt({color:9127187});break;case"consumable":if(e.id==="apple")if(this.player,this.player?.preloadedAppleModel,this.player&&this.player.preloadedAppleModel){i=this.player.preloadedAppleModel.clone(),this.fitModelToPreview(i),i.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),this.previewScene.add(i),this.previewMesh=i;return}else console.warn("Preloaded apple model not available, using fallback geometry"),console.warn("Player exists:",!!this.player),console.warn("Preloaded model exists:",!!(this.player&&this.player.preloadedAppleModel)),t=new qt(.3,16,12),n=new Gt({color:16729344});else t=new ln(.2,.2,.4,8),n=new Gt({color:5025616});break;case"material":e.id==="wood"?(t=new je(.8,.2,.2),n=new Gt({color:9127187})):e.id==="stone"?(t=new ns(.3),n=new Gt({color:6908265})):(t=new je(.4,.4,.4),n=new Gt({color:10395294}));break;default:t=new je(.5,.5,.5),n=new Gt({color:6710886})}t&&n&&(i=new Le(t,n),i.castShadow=!0,i.receiveShadow=!0,this.previewScene.add(i),this.previewMesh=i)}animate3DPreview(){!this.previewRenderer||!this.currentPreviewItem||!this.previewScene||(requestAnimationFrame(()=>this.animate3DPreview()),this.previewMesh&&(this.previewMesh.rotation.y+=.01),this.previewRenderer.render(this.previewScene,this.previewCamera))}showPickupPopup(e,t,n){if(this.pickupPopups.length>=3){const r=this.pickupPopups.shift();r&&r.parentNode&&r.parentNode.removeChild(r)}const i=document.createElement("div");i.className="pickup-popup";const s=this.getItemIcon(e);i.innerHTML=`
      <div class="item-icon" style="background-color: ${s.color};">
        ${s.icon}
      </div>
      <div class="pickup-details">
        <div class="pickup-item-name">
          <span class="pickup-plus-sign">+</span>${e.name}
        </div>
        <div class="pickup-item-quantity">
          ${t>1?`+${t}`:"+1"} (Total: ${n})
        </div>
      </div>
    `,document.body.appendChild(i),this.pickupPopups.push(i),setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i);const r=this.pickupPopups.indexOf(i);r!==-1&&this.pickupPopups.splice(r,1)},3e3),`${e.name}${t}${n}`}onItemRemovedFromWorld(e){this.currentPreviewItem&&this.currentPreviewItem.id===e&&this.closePreview(),this.cleanupWorldPickupPrompts(e)}cleanupWorldPickupPrompts(e){}showWorldPickupPromptsForNearbyItems(e){e.length}showPickupPromptsForNewItems(e){e.length}createNewWorldPickupPrompt(e){return null}updatePromptPosition(e,t){if(!window.gameInstance||!window.gameInstance.camera)return;const n=window.gameInstance.camera,i=t.position.clone();i.y+=1.5;const s=i.clone().project(n),r=(s.x*.5+.5)*window.innerWidth,a=(s.y*-.5+.5)*window.innerHeight;e.style.left=r+"px",e.style.top=a+"px";const l=n.position.distanceTo(t.position);s.z>1||l>20?e.style.display="none":e.style.display="block"}updateAllPromptPositions(e){this.validateExistingPrompts(e),e.forEach(t=>{const n=document.querySelector(`.world-pickup-prompt[data-item-id="${t.userData.itemId}"]`);n&&n.dataset.hidden!=="true"&&this.updatePromptPosition(n,t)})}validateExistingPrompts(e){const t=document.querySelectorAll(".world-pickup-prompt"),n=new Set(e.map(i=>i.userData.itemId));t.forEach(i=>{const s=i.dataset.itemId;n.has(s)||(i.style.transition="opacity 0.2s ease-out",i.style.opacity="0",i.dataset.hidden="true",setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},200))})}removeAllWorldPickupPrompts(){document.querySelectorAll(".world-pickup-prompt").forEach(t=>{t.remove()})}destroy(){this.hotbarElement&&this.hotbarElement.remove(),this.overlayElement&&this.overlayElement.remove(),this.buildPromptElement&&this.buildPromptElement.remove(),this.pickupPopups.forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)}),this.pickupPopups=[]}}class vv{constructor(e){this.scene=e,this.colliders=[],this.raycaster=new Fr,this.debugVisualization=[],this.debugVisible=!1,this.playerColliderVisualization=null,this.playerMesh=null,this.rayDistance=50,this.rayOriginOffset=.5}addCollider(e,t="ground",n={}){if(!e){console.warn("Cannot add null mesh as collider");return}const i={mesh:e,type:t,boundingBox:new Yt().setFromObject(e),name:e.name||n.name||"unnamed",buildingType:n.buildingType||null,isNewlyBuilt:n.isNewlyBuilt||!1};return this.colliders.push(i),`${i.name}${i.type}`,i.isNewlyBuilt,i.isNewlyBuilt&&this.updateColliderBoundingBox(i),i}removeCollider(e){const t=this.colliders.findIndex(n=>n.mesh===e);t!==-1&&(this.colliders.splice(t,1),`${e.name||"unnamed"}`)}setPlayerMesh(e){this.playerMesh=e}checkGroundCollision(e,t=2,n=.1){if(this.colliders.length===0)return{hasCollision:!1,groundHeight:null,distance:1/0,normal:new T(0,1,0),collider:null};const i=new T(e.x,e.y+n,e.z),s=new T(0,-1,0);this.raycaster.set(i,s);const r=[];for(const l of this.colliders)if(l.type==="ground")l.mesh.traverse(c=>{const h=c;h.isMesh&&h.geometry&&r.push(h)});else if(l.type==="mesh"){const c=l.mesh;c.isMesh&&c.geometry&&r.push(c)}const a=this.raycaster.intersectObjects(r);if(a.length>0){const l=a[0];return{hasCollision:!0,groundHeight:l.point.y,distance:l.distance,normal:l.face?l.face.normal.clone():new T(0,1,0),collider:this.colliders.find(c=>c.mesh.traverse(h=>h===l.object))}}return{hasCollision:!1,groundHeight:null,distance:1/0,normal:new T(0,1,0),collider:null}}checkHorizontalCollision(e,t,n=.5){if(this.colliders.length===0||t.lengthSq()===0)return{hasCollision:!1,correctedPosition:e.clone(),normal:new T};const i=e.clone(),s=e.clone().add(t);let r=!1;const a=s.clone(),l=new T;for(const c of this.colliders)if(c.type==="mesh"){if(c.name&&c.name.includes("treeCollider")){const h=c.mesh.position.clone(),d=c.mesh.userData.trunkRadius||.8,u=c.mesh.userData.trunkHeight||2,p=s.y-1,g=s.y+1,y=h.y-u*.5,m=h.y+u*.5;if(g>y&&p<m){const f=Math.sqrt(Math.pow(s.x-h.x,2)+Math.pow(s.z-h.z,2)),x=n+d;if(f<x){r=!0;const v=new T(s.x-h.x,0,s.z-h.z);v.lengthSq()===0&&v.set(1,0,0),v.normalize(),a.x=h.x+v.x*x,a.z=h.z+v.z*x,l.add(v)}}}else if(c.boundingBox.setFromObject(c.mesh),new Yt(new T(s.x-n,s.y-1,s.z-n),new T(s.x+n,s.y+1,s.z+n)).intersectsBox(c.boundingBox)){r=!0;const d=c.boundingBox.getCenter(new T),u=c.boundingBox.getSize(new T),p=Math.max(0,n+u.x*.5-Math.abs(s.x-d.x)),g=Math.max(0,n+u.z*.5-Math.abs(s.z-d.z));if(p>.01||g>.01){if(p<g&&p>.01){const m=s.x>d.x?1:-1,f=d.x+m*(u.x*.5+n+.02);Math.abs(f-i.x)<3?a.x=f:a.x=i.x}else if(g>.01){const m=s.z>d.z?1:-1,f=d.z+m*(u.z*.5+n+.02);Math.abs(f-i.z)<3?a.z=f:a.z=i.z}}const y=s.clone().sub(d);y.y=0,y.lengthSq()>0&&(y.normalize(),l.add(y))}}return r&&l.lengthSq()>0&&l.normalize(),{hasCollision:r,correctedPosition:a,normal:l}}checkSphereCollision(e,t){const n=[];for(const i of this.colliders)new gn(e,t).intersectsBox(i.boundingBox)&&n.push({collider:i,penetration:t-e.distanceTo(i.boundingBox.getCenter(new T))});return n}updateColliders(){for(const e of this.colliders)this.updateColliderBoundingBox(e)}updateColliderBoundingBox(e){e&&e.mesh&&(e.boundingBox.setFromObject(e.mesh),e.isNewlyBuilt&&(e.isNewlyBuilt=!1,`${e.name}`))}addBuildingCollider(e,t,n){if(!e){console.warn("Cannot add null building mesh as collider");return}e.updateMatrixWorld(!0);const i=this.addCollider(e,"mesh",{name:`${t}_${Date.now()}`,buildingType:t,isNewlyBuilt:!0});if(i){const s=e;s.geometry&&(s.geometry.computeBoundingBox(),s.geometry.computeBoundingSphere()),e.updateMatrixWorld(!0),this.updateColliderBoundingBox(i),`${t}${n.x.toFixed(1)}${n.y.toFixed(1)}${n.z.toFixed(1)}`}return i}toggleDebugVisualization(){this.debugVisible=!this.debugVisible,this.debugVisible?(this.showDebugVisualization(),this.showPlayerColliderVisualization()):(this.hideDebugVisualization(),this.hidePlayerColliderVisualization()),this.debugVisible}showDebugVisualization(){this.hideDebugVisualization(),`${this.colliders.length}`,this.colliders.forEach((e,t)=>{const n=new Dt;n.name=`debugCollider_${t}`;const i=e.type==="ground"?16711680:65280,s=e.mesh;if(s.isMesh&&s.geometry){const a=new nc(s.geometry),l=new Ln({color:i,transparent:!0,opacity:.8}),c=new bs(a,l);c.position.copy(e.mesh.position),c.rotation.copy(e.mesh.rotation),c.scale.copy(e.mesh.scale),n.add(c)}else e.mesh.traverse(a=>{const l=a;if(l.isMesh&&l.geometry){const c=new nc(l.geometry),h=new Ln({color:i,transparent:!0,opacity:.8}),d=new bs(c,h),u=new T,p=new ht,g=new T;a.getWorldPosition(u),a.getWorldQuaternion(p),a.getWorldScale(g),d.position.copy(u),d.setRotationFromQuaternion(p),d.scale.copy(g),n.add(d)}});const r=new Y0(e.boundingBox,16776960);n.add(r),this.debugVisualization.push(n),this.scene.add(n),`${e.name}`})}hideDebugVisualization(){this.debugVisualization.forEach(e=>{this.scene.remove(e)}),this.debugVisualization=[]}showPlayerColliderVisualization(){if(!this.playerMesh)return;this.hidePlayerColliderVisualization();const e=new Dt;e.name="playerColliderDebug";const t=new ln(.5,.5,2,12),n=new Xt({color:65280,wireframe:!0,transparent:!0,opacity:.6}),i=new Le(t,n);i.position.y=1,e.add(i);const s=new qt(.5,12,8),r=new Xt({color:65280,wireframe:!0,transparent:!0,opacity:.4}),a=new Le(s,r);a.position.y=2,e.add(a);const l=new Le(s,r);l.position.y=0,e.add(l),this.playerColliderVisualization=e,this.scene.add(e)}hidePlayerColliderVisualization(){this.playerColliderVisualization&&(this.scene.remove(this.playerColliderVisualization),this.playerColliderVisualization=null)}updatePlayerColliderVisualization(){this.playerColliderVisualization&&this.playerMesh&&(this.playerColliderVisualization.position.copy(this.playerMesh.position),this.playerColliderVisualization.rotation.copy(this.playerMesh.rotation))}visualizeRay(e,t,n=10,i=16711680){const s=this.scene.getObjectByName("debugRay");s&&this.scene.remove(s);const r=e.clone().add(t.clone().multiplyScalar(n)),a=[e,r],l=new mt().setFromPoints(a),c=new Ln({color:i}),h=new ts(l,c);h.name="debugRay",this.scene.add(h)}destroy(){this.hideDebugVisualization(),this.hidePlayerColliderVisualization(),this.colliders=[]}}class vc{constructor(e,t=null){this.buildableObjects=e,this.inventory=t,this.itemRegistry=null}setInventory(e){this.inventory=e}setItemRegistry(e){this.itemRegistry=e}hasRequiredResources(e){if(!this.inventory)return!0;const t=this.buildableObjects[e],n=t?t.cost:{wood:10};return this.inventory.hasItem("wood",n.wood)}consumeResources(e){if(!this.inventory)return;const t=this.buildableObjects[e],n=t?t.cost:{wood:10};this.inventory.removeItem("wood",n.wood),`${n.wood}${t.name}`}returnResources(e){if(!this.inventory||!e.userData.isBuildingWall)return;const t=this.buildableObjects.wall;if(!t)return;const n=t.cost.wood,i=Math.floor(n/2);if(`${this.inventory.getItemCount("wood")}`,i>0){const s={id:"wood",name:"Wood",type:"material",stackSize:64},r=this.inventory.addItem(s,i);return`${this.inventory.getItemCount("wood")}`,{success:r===i,amountAdded:r,expectedAmount:i,originalCost:n}}else return`${t.name}${n}`,{success:!0,amountAdded:0,expectedAmount:0,originalCost:n}}showResourceWarning(e,t){let n=document.getElementById("resourceWarning");n||(n=document.createElement("div"),n.id="resourceWarning",n.style.cssText=`
        position: fixed;
        color: #ff4444;
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: bold;
        z-index: 3000;
        pointer-events: none;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        white-space: nowrap;
      `,document.body.appendChild(n)),n.textContent="Not enough resources",n.style.display="block",this.updateCursorWarningPosition(e,t,n)}hideResourceWarning(){const e=document.getElementById("resourceWarning");e&&(e.style.display="none")}updateCursorWarningPosition(e,t,n=null){const i=n||document.getElementById("resourceWarning");if(!i||i.style.display==="none")return;t.domElement?.getBoundingClientRect();const s=(e.x+1)/2*window.innerWidth,r=(-e.y+1)/2*window.innerHeight;i.style.left=s+15+"px",i.style.top=r-25+"px"}}class xv{constructor(){this.loader=new Cn,this.buildableObjects={},this.loadingPromises=[],this.builtObjectsByType=new Map,this.objectDefinitions={wall:{name:"Wall",modelUrl:"assets/build_wall.glb",scale:2,cost:{wood:10},cellSize:{width:3,height:1},description:"Basic wooden wall for protection"},spikedWall:{name:"Spiked Wall",modelUrl:"assets/build_wall_spiked.glb",scale:2,cost:{wood:15},cellSize:{width:3,height:1},description:"Reinforced wall with spikes for extra protection"},farmingPlot:{name:"Farming Plot",modelUrl:"assets/farming_plot.glb",scale:2,cost:{wood:5},cellSize:{width:3,height:7},description:"A tilled plot of land for growing crops"},floor:{name:"Floor",modelUrl:"assets/build_floor_ceiling.glb",scale:2,cost:{wood:8},cellSize:{width:4,height:4},description:"Wooden floor panel for building foundations"},ramp:{name:"Ramp",modelUrl:"assets/build_ramp.glb",scale:2,cost:{wood:12},cellSize:{width:3,height:1},placementOffset:{x:-1,z:-1},description:"Sloped ramp for accessing different building levels"}}}async loadAllModels(){this.buildableObjects={},this.loadingPromises=[];for(const[e,t]of Object.entries(this.objectDefinitions)){const n=this.loadSingleModel(e,t);this.loadingPromises.push(n)}return await Promise.all(this.loadingPromises),this.buildableObjects}async loadSingleModel(e,t){return new Promise((n,i)=>{this.loader.load(t.modelUrl,s=>{this.buildableObjects[e]={...t,mesh:s.scene.clone()},this.setupModelProperties(this.buildableObjects[e]),`${t.name}`,n()},()=>{},s=>{console.error(`BuildableObjectsRegistry: Error loading ${t.name} model:`,s),i(s)})})}setupModelProperties(e){e.mesh&&(e.mesh.traverse(t=>{const n=t;if(n.isMesh){n.castShadow=!0,n.receiveShadow=!0;const i=n.material;i&&i.isMeshStandardMaterial&&(i.metalness=.1,i.roughness=.8)}}),e.mesh.scale.setScalar(e.scale))}getBuildableObjects(){return this.buildableObjects}getBuildableObject(e){return this.buildableObjects[e]}addObjectDefinition(e,t){this.objectDefinitions[e]=t}removeObjectDefinition(e){delete this.objectDefinitions[e],delete this.buildableObjects[e]}getObjectKeys(){return Object.keys(this.objectDefinitions)}getObjectDefinitions(){return this.objectDefinitions}hasObject(e){return e in this.objectDefinitions}getObjectCost(e){const t=this.objectDefinitions[e];return t?t.cost:null}getObjectCellSize(e){const t=this.objectDefinitions[e];return t?t.cellSize:1}registerBuiltObject(e,t){this.builtObjectsByType.has(e)||this.builtObjectsByType.set(e,[]),t.userData,t.position,Object.keys(this.objectDefinitions),this.builtObjectsByType.get(e).push(t),`${e}${e}${this.builtObjectsByType.get(e).length}`}addBuiltObject(e,t){return this.registerBuiltObject(e,t)}removeBuiltObject(e){for(const[t,n]of this.builtObjectsByType.entries()){const i=n.indexOf(e);if(i!==-1)return n.splice(i,1),`${t}${t}${n.length}`,t}return null}getBuiltObjectsByType(e){return this.builtObjectsByType.get(e)||[]}getAllBuiltObjects(){for(const[e,t]of this.builtObjectsByType.entries())`${e}${t.length}`,t.forEach((n,i)=>{`${i}${n.userData?.buildingType}${n.userData?.type}`});return this.builtObjectsByType}getAllBuiltObjectsForSaving(){const e=[];for(const[t,n]of this.builtObjectsByType.entries())n.forEach((i,s)=>{if(i&&i.position){const r={id:`${t}_${s}`,type:t,subType:i.userData?.subType||null,position:{x:i.position.x,y:i.position.y,z:i.position.z},rotation:{x:i.rotation.x,y:i.rotation.y,z:i.rotation.z},scale:{x:i.scale.x,y:i.scale.y,z:i.scale.z},material:i.material?.name||"default",uuid:i.uuid||null,visible:i.visible!==!1};i.userData&&(r.userData={...i.userData}),e.push(r)}});return`${e.length}`,e}getBuiltObjectCount(e){const t=this.builtObjectsByType.get(e);return t?t.length:0}clearAllBuiltObjects(){this.builtObjectsByType.clear()}clearBuiltObjects(){return this.clearAllBuiltObjects()}}class _v{constructor(e){this.buildingSystem=e}getAllBuiltObjectsForSaving(){const e=[],t=this.buildingSystem.objectsRegistry.getAllBuiltObjects();return Object.entries(t).forEach(([n,i])=>{`${i.length}${n}`,i.forEach((s,r)=>{let a=n;s.userData&&s.userData.buildingType&&s.userData.buildingType!==n?(`${r}${s.userData.buildingType}${n}`,a=s.userData.buildingType):s.userData&&s.userData.type&&s.userData.type!==n&&(`${r}${s.userData.type}${n}`,a=s.userData.type),e.push({type:a,position:{x:s.position.x,y:s.position.y,z:s.position.z},rotation:s.rotation.y})})}),this.buildingSystem.builtWalls&&this.buildingSystem.builtWalls.length>0&&(`${this.buildingSystem.builtWalls.length}`,this.buildingSystem.builtWalls.forEach(n=>{if(!e.some(s=>Math.abs(s.position.x-n.position.x)<.01&&Math.abs(s.position.y-n.position.y)<.01&&Math.abs(s.position.z-n.position.z)<.01)){let s="wall";n.userData&&n.userData.buildingType&&(s=n.userData.buildingType),e.push({type:s,position:{x:n.position.x,y:n.position.y,z:n.position.z},rotation:n.rotation.y}),`${n.position.x}${n.position.z}${s}`}})),`${e.length}`,e}createBuildingMesh(e,t,n){`${e}`,Object.keys(this.buildingSystem.buildableObjects),Object.keys(this.buildingSystem.buildableObjects).length>0;let i=e;if(typeof e=="object")if(e.name)i={Wall:"wall","Spiked Wall":"spikedWall",Floor:"floor"}[e.name]||e.name.toLowerCase(),`${e.name}${i}`;else if(e.type)i=e.type;else return console.error("Invalid building type object - no name or type property:",e),null;const s=this.buildingSystem.buildableObjects[i];if(!s||!s.mesh)return console.error(`No buildable object found for type: ${i}`,{buildObject:s,availableTypes:Object.keys(this.buildingSystem.buildableObjects),requestedType:i}),null;const r=s.mesh.clone();return r.position.copy(t),r.rotation.y=n,r.userData={isCollider:!0,colliderType:"mesh",isBuildingWall:!0,isBreakable:!0,buildingType:i,type:i},r.traverse(a=>{a.isMesh&&(a.userData={isCollider:!0,colliderType:"mesh",isBuildingWall:!0,isBreakable:!0,buildingType:i,type:i},a.geometry&&(a.geometry.computeBoundingBox(),a.geometry.computeBoundingSphere()),a.updateMatrixWorld(!0))}),r.updateMatrixWorld(!0),r}restoreBuilding(e){if("type"in e,e.type,e.type,!this.buildingSystem.buildableObjects||Object.keys(this.buildingSystem.buildableObjects).length===0)return console.error("Buildable objects not loaded yet, cannot restore building"),!1;const{type:t,position:n,rotation:i}=e;if(!t)return console.error("Building data missing type:",e),!1;const s=new T(n.x,n.y,n.z),r=this.createBuildingMesh(t,s,i);if(!r)return console.error(`Failed to create building mesh for type: ${t}`),!1;this.buildingSystem.scene.add(r),this.buildingSystem.collisionSystem&&this.buildingSystem.collisionSystem.addCollider(r,"mesh"),this.buildingSystem.builtWalls.push(r);const a=typeof t=="object"&&t.type?t.type:t;this.buildingSystem.objectsRegistry.addBuiltObject(a,r),this.buildingSystem.objectsRegistry.getBuiltObjectCount(a);const l=this.buildingSystem.selectedBuildObject;this.buildingSystem.selectedBuildObject=a;const c=this.buildingSystem.getOccupiedCells(s,i);return this.buildingSystem.selectedBuildObject=l,c.forEach(h=>{this.buildingSystem.occupiedCells.add(h),this.buildingSystem.cellToWallMap.set(h,r)}),`${a}${n.x}${n.y}${n.z}`,!0}}class bv{constructor(e,t=2,n=50){this.scene=e,this.gridSize=t,this.gridExtent=n,this.currentLevel=0,this.levelHeight=4,this.maxLevels=10,this.minLevel=0,this.levelGrids=new Map,this.levelOccupiedCells=new Map,this.levelCellToWallMap=new Map,this.setupKeyboardControls(),this.initialize()}initialize(){for(let e=this.minLevel;e<this.maxLevels;e++)this.levelOccupiedCells.set(e,new Set),this.levelCellToWallMap.set(e,new Map);this.createLevelGrid(0),this.createLevelGrid(1),this.createLevelGrid(-1),`${this.maxLevels}`,`${this.currentLevel}${this.getLevelY(this.currentLevel)}`}createLevelGrid(e){if(this.levelGrids.has(e))return;const t=this.getLevelY(e),n=new q0(this.gridExtent*this.gridSize,this.gridExtent,e===this.currentLevel?6710886:3355443,e===this.currentLevel?4473924:2236962);n.position.y=t+.01,n.visible=!1,n.userData={level:e},this.scene.add(n),this.levelGrids.set(e,n)}setupKeyboardControls(){document.addEventListener("keydown",e=>{const t=e.target;if(!(t?.tagName==="INPUT"||t?.tagName==="TEXTAREA"))switch(e.code){case"ArrowUp":e.preventDefault(),this.switchToLevel(this.currentLevel+1);break;case"ArrowDown":e.preventDefault(),this.switchToLevel(this.currentLevel-1);break}})}getLevelY(e){return 6+e*this.levelHeight}switchToLevel(e){if(e<this.minLevel||e>=this.maxLevels)return console.warn(`Level ${e} is out of bounds (${this.minLevel}-${this.maxLevels-1})`),!1;const t=this.currentLevel;return this.currentLevel=e,this.createLevelGrid(e),this.dispatchLevelChangeEvent(t,e),`${this.getLevelY(e)}`,`${this.getCurrentLevelOccupiedCells().size}`,!0}updateGridVisibility(e=!1){if(this.levelGrids.forEach((t,n)=>{t.visible=!1;const i=t.material;n===this.currentLevel?i.color.setHex(6710886):i.color.setHex(3355443)}),e){const t=this.levelGrids.get(this.currentLevel);t&&(t.visible=!0)}}dispatchLevelChangeEvent(e,t){const n=new CustomEvent("levelChanged",{detail:{previousLevel:e,newLevel:t,levelY:this.getLevelY(t),levelInfo:this.getLevelInfo()}});document.dispatchEvent(n)}getCurrentLevelOccupiedCells(){return this.levelOccupiedCells.get(this.currentLevel)||new Set}isCellOccupiedOnCurrentLevel(e){return this.getCurrentLevelOccupiedCells().has(e)}isCellOccupiedOnAnyLevel(e){for(const[t,n]of this.levelOccupiedCells)if(n.has(e))return{occupied:!0,level:t};return{occupied:!1,level:null}}addOccupiedCell(e){this.getCurrentLevelOccupiedCells().add(e),`${e}${this.currentLevel}`}removeOccupiedCell(e){const t=this.getCurrentLevelOccupiedCells();return t.has(e)?(t.delete(e),`${e}${this.currentLevel}`,!0):!1}getCurrentLevelCellToWallMap(){return this.levelCellToWallMap.get(this.currentLevel)||new Map}getCurrentLevel(){return this.currentLevel}getCurrentLevelY(){return this.getLevelY(this.currentLevel)}getLevelInfo(){return{currentLevel:this.currentLevel,currentLevelY:this.getCurrentLevelY(),minLevel:this.minLevel,maxLevel:this.maxLevels-1,levelHeight:this.levelHeight,totalLevels:this.maxLevels}}destroy(){this.handleKeyDown&&document.removeEventListener("keydown",this.handleKeyDown),this.levelGrids.forEach(e=>{this.scene.remove(e)}),this.levelGrids.clear(),this.levelOccupiedCells.clear(),this.levelCellToWallMap.clear()}}class Mv{constructor(e,t,n,i=null){this.scene=e,this.camera=t,this.collisionSystem=n,this.inventory=i,this.objectsRegistry=new xv,this.buildableObjects={},this.resourceManager=new vc(this.buildableObjects,i),this.saveManager=new _v(this),this.levelManager=new bv(e,2,50),this.gridSize=this.levelManager.gridSize,this.gridExtent=this.levelManager.gridExtent,this.isBuilding=!1,this.previewMesh=null,this.wallMesh=null,this.builtWalls=[],this.raycaster=new Fr,this.mouse=new Ee,this.buildingMode="build",this.selectedBuildObject="wall",this.wallCost={wood:10},this.currentRotation=0,this.rotationSteps=[0,Math.PI/2,Math.PI,3*Math.PI/2],this.currentRotationIndex=0,this.debugIndicators=new Map,this.showDebugIndicators=!1,this.animatingWalls=new Set,this.particleSystems=new Map,this.player=null,this.init()}async init(){await this.loadBuildableObjects(),this.levelManager.initialize(),this.updateLevelReferences(),this.setupEventListeners()}async loadBuildableObjects(){this.buildableObjects=await this.objectsRegistry.loadAllModels(),this.resourceManager=new vc(this.buildableObjects,this.inventory),this.wallMesh=this.buildableObjects.wall?.mesh||null}createLevelGrid(e){this.levelManager.createLevelGrid(e,this.isBuilding)}getLevelY(e){return this.levelManager.getLevelY(e)}switchToLevel(e){const t=this.levelManager.switchToLevel(e,this.isBuilding);return t&&(this.previewMesh&&(this.scene.remove(this.previewMesh),this.previewMesh=null),this.updateLevelReferences()),this.updateGridVisibility(),t}updateGridVisibility(){this.levelManager.updateGridVisibility(this.isBuilding)}updateLevelReferences(){this.occupiedCells=this.getCurrentLevelOccupiedCells(),this.cellToWallMap=this.getCurrentLevelCellToWallMap()}getCurrentLevelOccupiedCells(){return this.levelManager.getCurrentLevelOccupiedCells()}getCurrentLevelCellToWallMap(){return this.levelManager.getCurrentLevelCellToWallMap()}getCurrentLevel(){return this.levelManager.getCurrentLevel()}getCurrentLevelY(){return this.levelManager.getCurrentLevelY()}getLevelInfo(){return this.levelManager.getLevelInfo()}setPlayer(e){this.player=e}updateGridPosition(){}createGridHelper(){}setupEventListeners(){window.addEventListener("mousemove",e=>{this.isBuilding&&(this.updateMousePosition(e),this.updatePreview(),this.updateCursorWarningPosition())}),window.addEventListener("click",e=>{this.isBuilding&&!this.isCursorOverUI(e)&&(this.buildingMode==="build"?this.buildWall():this.buildingMode==="delete"&&this.deleteWall())}),this.vKeyPressed=!1,this.rKeyPressed=!1,this.xKeyPressed=!1,this.cKeyPressed=!1,this.keydownHandler=e=>{e.code==="KeyV"&&!this.vKeyPressed&&(e.preventDefault(),e.stopPropagation(),this.vKeyPressed=!0,this.isBuilding,this.toggleBuildingMode()),e.code==="KeyR"&&this.isBuilding&&!this.rKeyPressed&&(e.preventDefault(),e.stopPropagation(),this.rKeyPressed=!0,this.rotateWall()),e.code==="KeyX"&&this.isBuilding&&!this.xKeyPressed&&(e.preventDefault(),e.stopPropagation(),this.xKeyPressed=!0,this.toggleBuildingTool()),e.code==="KeyC"&&this.isBuilding&&this.buildingMode==="build"&&!this.cKeyPressed&&(e.preventDefault(),e.stopPropagation(),this.cKeyPressed=!0,this.showSelectionScreen()),e.code==="Escape"&&this.isBuilding&&(e.preventDefault(),e.stopPropagation(),this.exitBuildingMode())},this.keyupHandler=e=>{e.code==="KeyV"&&(this.vKeyPressed=!1),e.code==="KeyR"&&(this.rKeyPressed=!1),e.code==="KeyX"&&(this.xKeyPressed=!1),e.code==="KeyC"&&(this.cKeyPressed=!1)},document.addEventListener("keydown",this.keydownHandler),document.addEventListener("keyup",this.keyupHandler)}updateMousePosition(e){this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1}isCursorOverUI(e){const t=document.elementFromPoint(e.clientX,e.clientY);if(!t)return!1;const n=["#buildingUI","#selectionScreen","#instructions","#compass","#heldItemPosition","#playerPosition","#playerHeightControl","#occupiedSlots","#inventoryContainer","#resourceWarning"],i=[".inventory-ui",".hotbar",".hotbar-slot",".backpack-overlay",".backpack-container",".inventory-slot",".item-icon",".item-quantity",".close-button"],s=[...n,...i];let r=t;for(;r&&r!==document.body;){if(r.id){for(const a of s)if(a.startsWith("#")&&r.id===a.substring(1))return!0}if(r.classList){for(const a of s)if(a.startsWith(".")){const l=a.substring(1);if(r.classList.contains(l))return!0}}if(r.classList){const a=["object-card","ui-element","dragging","drag-over","selected","slot-number","section-title","backpack-header","backpack-title","inventory-sections","hotbar-section","backpack-grid"];for(const l of a)if(r.classList.contains(l))return!0}if(r.getAttribute&&(r.getAttribute("data-container")||r.getAttribute("data-index")||r.getAttribute("data-ui")==="true"||r.style.zIndex>100)||r.closest&&(r.closest(".inventory-ui")||r.closest(".backpack-overlay")||r.closest(".hotbar")||r.closest("[data-container]")))return!0;r=r.parentElement}return!1}updatePreview(){if(!this.isBuilding||!this.wallMesh)return;this.ensureFreshPreview();const e={clientX:(this.mouse.x+1)/2*window.innerWidth,clientY:(-this.mouse.y+1)/2*window.innerHeight};if(this.isCursorOverUI(e)){this.previewMesh&&(this.previewMesh.visible=!1);return}if(this.raycaster.setFromCamera(this.mouse,this.camera),this.buildingMode==="build"){const t=this.getCurrentLevelY(),n=new Wn(new T(0,1,0),-t),i=new T;let s;if(this.raycaster.ray.intersectPlane(n,i)&&(s=this.snapToGrid(i,t)),s){this.previewMesh||this.createPreview(),this.previewMesh.position.copy(s),this.previewMesh.rotation.y=this.currentRotation,this.previewMesh.updateMatrixWorld(!0),this.previewMesh.visible=!0;const a=this.getOccupiedCells(s,this.currentRotation).filter(u=>this.levelManager.isCellOccupiedOnCurrentLevel(u)),l=a.length>0,c=this.checkPhysicalIntersection(s,this.currentRotation),h=l||c;Math.random()<.1&&h&&`${s.x}${s.z}${(this.currentRotation*180/Math.PI).toFixed(0)}`;const d=this.resourceManager.hasRequiredResources(this.selectedBuildObject);d?this.resourceManager.hideResourceWarning():this.resourceManager.showResourceWarning(this.mouse,this.camera),this.previewMesh.traverse(u=>{u.isMesh&&u.material&&(h||!d?(u.material.color.setHex(16729156),u.material.opacity=.5):(u.material.color.setHex(4521796),u.material.opacity=.7))})}}else if(this.buildingMode==="delete"){this.hideResourceWarning();const t=this.raycaster.intersectObjects(this.builtWalls,!0);if(t.length>0){const n=this.findBreakableParent(t[0].object);n&&!this.animatingWalls.has(n)?(this.createDeletePreview(n),this.previewMesh.position.copy(n.position),this.previewMesh.rotation.copy(n.rotation),this.previewMesh.updateMatrixWorld(!0),this.previewMesh.visible=!0,this.previewMesh.traverse(i=>{i.isMesh&&i.material&&(i.material.color.setHex(16746564),i.material.opacity=.8)})):this.previewMesh&&(this.previewMesh.visible=!1)}else this.previewMesh&&(this.previewMesh.visible=!1)}}findBreakableParent(e){let t=e;for(;t&&t!==this.scene;){if(this.builtWalls.includes(t))return t;t=t.parent}return null}createPreview(){const e=this.buildableObjects[this.selectedBuildObject];!e||!e.mesh||(this.previewMesh=e.mesh.clone(),this.setupPreviewMaterial(this.previewMesh),this.scene.add(this.previewMesh))}createDeletePreview(e){this.previewMesh&&(this.scene.remove(this.previewMesh),this.previewMesh=null),this.previewMesh=e.clone(),this.setupPreviewMaterial(this.previewMesh),this.scene.add(this.previewMesh)}setupPreviewMaterial(e){e.traverse(t=>{t.isMesh&&(t.material&&(Array.isArray(t.material)?t.material=t.material.map(n=>n.clone()):t.material=t.material.clone(),Array.isArray(t.material)?t.material.forEach(n=>{n.transparent=!0,n.opacity=.7,n.color.setHex(4521796)}):(t.material.transparent=!0,t.material.opacity=.7,t.material.color.setHex(4521796))),t.castShadow=!1,t.receiveShadow=!1)})}ensureFreshPreview(){const e=this.buildableObjects[this.selectedBuildObject];if(!e||!e.mesh)return;let t=!1;if(!this.previewMesh)t=!0;else{const n=this.previewMesh.children.length,i=e.mesh.children.length;n!==i&&(t=!0)}t&&(this.previewMesh&&(this.scene.remove(this.previewMesh),this.previewMesh=null),this.createPreview())}snapToGrid(e,t=null){t===null&&(t=this.getCurrentLevelY());const n=Math.round(e.x/this.gridSize)*this.gridSize,i=Math.round(e.z/this.gridSize)*this.gridSize,s=Math.round(n/this.gridSize)*this.gridSize,r=Math.round(i/this.gridSize)*this.gridSize;return new T(s,t,r)}getCellKey(e){const t=Math.round((e.x+.001)/this.gridSize),n=Math.round((e.z+.001)/this.gridSize);return`${t},${n}`}getOccupiedCells(e,t){const n=this.buildableObjects[this.selectedBuildObject],i=n?n.cellSize:3.5,s=Math.round((e.x+.001)/this.gridSize),r=Math.round((e.z+.001)/this.gridSize),a=[],c=(Math.round(t*180/Math.PI/90)*90%360+360)%360;let h,d;return typeof i=="object"&&i.width&&i.height?(h=i.width,d=i.height,`${n?.name||"wall"}${h}${d}${s}${r}${c}`):(h=i,d=1,`${n?.name||"wall"}${h}${s}${r}${c}`),`${e.x.toFixed(3)}${e.z.toFixed(3)}`,this.calculateRotatedCells(s,r,h,d,c,a),`${a.length}`,a}calculateRotatedCells(e,t,n,i,s,r){const a=Math.floor(n/2),l=Math.floor(i/2),c=[];for(let h=-a;h<n-a;h++)for(let d=-l;d<i-l;d++)c.push({x:h,z:d});c.forEach(h=>{let d,u;switch(s){case 0:d=h.x,u=h.z;break;case 90:d=-h.z,u=h.x;break;case 180:d=-h.x,u=-h.z;break;case 270:d=h.z,u=-h.x;break;default:d=h.x,u=h.z}const p=e+d,g=t+u,y=`${p},${g}`;r.push(y)}),`${n}${i}${s}${r.length}`}buildWall(){const e=this.buildableObjects[this.selectedBuildObject];if(!this.previewMesh||!e||!e.mesh)return;if(!this.hasRequiredResources()){this.showResourceWarning();return}const t=this.previewMesh.position.clone(),n=this.getOccupiedCells(t,this.currentRotation),i=[];n.forEach(c=>{this.levelManager.isCellOccupiedOnCurrentLevel(c)&&i.push(c)});const s=this.checkPhysicalIntersection(t,this.currentRotation),r=i.length>0;if(r||s){this.currentRotation*180/Math.PI,r&&Array.from(this.occupiedCells);return}const a=e.mesh.clone();if(a.position.copy(t),a.rotation.y=this.currentRotation,this.scene.add(a),a.userData={isCollider:!0,colliderType:"mesh",isBuildingWall:!0,isBreakable:!0,buildingType:this.selectedBuildObject,type:this.selectedBuildObject},a.traverse(c=>{c.isMesh&&(c.userData={isCollider:!0,colliderType:"mesh",isBuildingWall:!0,isBreakable:!0,buildingType:this.selectedBuildObject,type:this.selectedBuildObject},c.geometry&&(c.geometry.computeBoundingBox(),c.geometry.computeBoundingSphere()),c.updateMatrixWorld(!0))}),a.updateMatrixWorld(!0),this.collisionSystem){a.position,a.children.filter(h=>h.isMesh).length,this.collisionSystem.addCollider(a,"mesh"),this.collisionSystem.colliders.length;const c=new Yt().setFromObject(a)}else console.warn("Collision system not available when building wall");this.consumeResources(),this.builtWalls.push(a),`${this.selectedBuildObject}`,this.objectsRegistry.addBuiltObject(this.selectedBuildObject,a);const l=this.objectsRegistry.getBuiltObjectCount(this.selectedBuildObject);`${l}${this.selectedBuildObject}`,`${n.length}`,a.position,a.scale.x,n.forEach(c=>{this.levelManager.addOccupiedCell(c),this.cellToWallMap.set(c,a),`${c}${a.position.x}${a.position.z}`,this.showDebugIndicators&&this.createDebugIndicator(c)}),`${this.occupiedCells.size}`,`${this.cellToWallMap.size}`,this.playPlacementAnimation(a),`${t.x}${t.z}${this.currentRotation.toFixed(2)}`,a.userData,a.children.filter(c=>c.isMesh).length}rotateWall(){this.currentRotationIndex=(this.currentRotationIndex+1)%this.rotationSteps.length,this.currentRotation=this.rotationSteps[this.currentRotationIndex],`${(this.currentRotation*180/Math.PI).toFixed(0)}`,this.isBuilding&&this.updatePreview()}toggleBuildingTool(){const e=this.buildingMode;this.buildingMode=this.buildingMode==="build"?"delete":"build",e==="delete"&&this.buildingMode==="build"?(this.previewMesh&&(this.scene.remove(this.previewMesh),this.previewMesh=null),this.updatePreview()):this.updatePreview(),this.updateBuildingUI(),`${this.buildingMode}`}showSelectionScreen(){let e=document.getElementById("selectionScreen");e||(e=document.createElement("div"),e.id="selectionScreen",e.style.cssText=`
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 320px;
        background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
        border: 3px solid #DEB887;
        border-radius: 25px;
        padding: 25px;
        z-index: 1000;
        font-family: 'Nunito', Arial, sans-serif;
        color: #F5DEB3;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), inset 0 2px 5px rgba(245, 222, 179, 0.1);
        max-height: 80vh;
        overflow-y: auto;
        backdrop-filter: blur(15px);
      `,document.body.appendChild(e)),this.initializeSelectionPreviews(),e.innerHTML=`
      <div style="text-align: center; margin-bottom: 25px;">
        <h3 style="
          color: #F5DEB3; 
          font-family: 'Fredoka One', Arial, sans-serif;
          font-size: 22px; 
          margin: 0 0 8px 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        ">🔨 Build Menu</h3>
        <p style="
          color: #DEB887; 
          font-size: 14px; 
          margin: 0;
          font-weight: 500;
        ">Choose what to build</p>
      </div>
      
      <div id="objectList" style="display: flex; flex-direction: column; gap: 12px;">
        ${Object.entries(this.buildableObjects).map(([n,i])=>`
          <div class="object-card" data-object="${n}" style="
            background: ${this.selectedBuildObject===n?"linear-gradient(135deg, #DEB887 0%, #F5DEB3 50%, #DEB887 100%)":"linear-gradient(135deg, rgba(222, 184, 135, 0.3) 0%, rgba(245, 222, 179, 0.2) 50%, rgba(222, 184, 135, 0.3) 100%)"};
            border: 3px solid ${this.selectedBuildObject===n?"#F5DEB3":"#A0522D"};
            border-radius: 18px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            box-shadow: ${this.selectedBuildObject===n?"0 8px 25px rgba(245, 222, 179, 0.4), inset 0 2px 5px rgba(139, 69, 19, 0.1)":"0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.1)"};
          ">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div id="preview-${n}" style="
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
                border: 2px solid #DEB887;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.2);
                overflow: hidden;
              ">
                <!-- 3D preview will be inserted here -->
              </div>
              
              <div style="flex: 1; min-width: 0;">
                <div style="
                  color: ${this.selectedBuildObject===n?"#8B4513":"#F5DEB3"};
                  font-family: 'Fredoka One', Arial, sans-serif;
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 6px;
                  line-height: 1.2;
                  text-shadow: ${this.selectedBuildObject===n?"none":"1px 1px 2px rgba(0, 0, 0, 0.3)"};
                ">${i.name}</div>
                
                <div style="
                  color: ${this.selectedBuildObject===n?"#A0522D":"#DEB887"};
                  font-size: 14px;
                  font-weight: 600;
                  margin-bottom: 4px;
                ">🪵 ${i.cost.wood} Wood</div>
                
                <div style="
                  color: ${this.selectedBuildObject===n?"#8B4513":"#DEB887"};
                  font-size: 12px;
                  opacity: 0.8;
                ">${i.cellSize===3?"9 cells (3x3)":i.cellSize+" cell"+(i.cellSize!==1?"s":"")}</div>
              </div>
              
              ${this.selectedBuildObject===n?`
                <div style="
                  background: linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%);
                  color: #8B4513;
                  border: 2px solid #A0522D;
                  border-radius: 50%;
                  width: 28px;
                  height: 28px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 14px;
                  font-weight: bold;
                  flex-shrink: 0;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                ">✓</div>
              `:""}
            </div>
          </div>
        `).join("")}
      </div>
      
      <div style="
        text-align: center; 
        color: #DEB887; 
        font-size: 12px; 
        font-weight: 500;
        margin-top: 20px; 
        padding-top: 20px; 
        border-top: 2px solid rgba(222, 184, 135, 0.3);
      ">
        <p style="margin: 0;">Click to select • <span style="color: #F5DEB3; font-weight: 700;">Esc</span> to close</p>
      </div>
    `,this.selectionScreenKeyHandler=n=>{n.code==="Escape"&&this.hideSelectionScreen()},document.addEventListener("keydown",this.selectionScreenKeyHandler),e.querySelectorAll(".object-card").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-object");this.selectBuildObject(i)}),n.addEventListener("mouseenter",()=>{n.getAttribute("data-object")!==this.selectedBuildObject&&(n.style.borderColor="#F5DEB3",n.style.transform="translateY(-2px) scale(1.02)",n.style.boxShadow="0 8px 25px rgba(245, 222, 179, 0.3), inset 0 2px 5px rgba(139, 69, 19, 0.1)")}),n.addEventListener("mouseleave",()=>{n.getAttribute("data-object")!==this.selectedBuildObject&&(n.style.borderColor="#A0522D",n.style.transform="translateY(0) scale(1)",n.style.boxShadow="0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.1)")})}),e.style.display="block"}selectBuildObject(e){this.selectedBuildObject=e,this.buildingMode==="delete"&&(this.buildingMode="build"),this.previewMesh&&(this.scene.remove(this.previewMesh),this.previewMesh=null),this.showSelectionScreen(),this.isBuilding&&this.updatePreview(),this.updateBuildingUI(),`${this.buildableObjects[e].name}`}hideSelectionScreen(){const e=document.getElementById("selectionScreen");e&&(e.style.display="none"),this.selectionScreenKeyHandler&&(document.removeEventListener("keydown",this.selectionScreenKeyHandler),this.selectionScreenKeyHandler=null),this.previewMesh&&(this.scene.remove(this.previewMesh),this.previewMesh=null),this.isBuilding&&this.updatePreview(),this.updateBuildingUI()}deleteWall(){if(!this.wallMesh)return;this.raycaster.setFromCamera(this.mouse,this.camera);const e=this.raycaster.intersectObjects(this.builtWalls,!0);if(e.length>0){const t=this.findBreakableParent(e[0].object);if(t){if(this.animatingWalls.has(t))return;this.breakObject(t),this.isBuilding&&setTimeout(()=>{this.updatePreview()},50)}}}breakObject(e){!e||!e.userData.isBreakable||this.animatingWalls.has(e)||(this.returnResources(e),this.playBreakAnimation(e))}playBreakAnimation(e){e.position,this.animatingWalls.add(e);const t=e.scale.clone(),n=e.position.clone(),i=e.rotation.clone();e.traverse(l=>{l.isMesh&&l.material&&(l.material=l.material.clone())}),this.createDestructionParticles(e,n);const s=600,r=Date.now(),a=()=>{const l=Date.now()-r,c=Math.min(l/s,1),d=(p=>p<.5?2*p*p:-1+(4-2*p)*p)(c),u=t.x*(1-d);e.scale.setScalar(Math.max(.01,u)),e.rotation.x=i.x+Math.sin(c*Math.PI*2)*.05,e.rotation.y=i.y,e.rotation.z=i.z+Math.cos(c*Math.PI*2)*.05,e.traverse(p=>{p.isMesh&&p.material&&(p.material.transparent||(p.material.transparent=!0),p.material.opacity=1-d)}),c<1?requestAnimationFrame(a):this.completeWallBreak(e)};a()}completeWallBreak(e){if(e.userData.isBuildingWall){const t=[];for(const[s,r]of this.cellToWallMap.entries())r===e&&t.push(s);if(e.position,`${e.scale.x}`,`${e.rotation.y}${(e.rotation.y*180/Math.PI).toFixed(0)}`,`${t.length}`,t.length===0){console.warn("⚠️ No cells found for this wall in cellToWallMap - trying fallback method");const s=this.selectedBuildObject;this.selectedBuildObject="wall";const r=this.getOccupiedCells(e.position,e.rotation.y);this.selectedBuildObject=s,t.push(...r)}const n=this.builtWalls.indexOf(e);n!==-1&&(this.builtWalls.splice(n,1),`${n}`),this.objectsRegistry.removeBuiltObject(e);let i=0;t.forEach(s=>{this.levelManager.removeOccupiedCell(s)?(i++,`${s}`):`${s}`,this.cellToWallMap.has(s)&&(this.cellToWallMap.delete(s),`${s}`),this.removeDebugIndicator(s)}),`${i}`,Array.from(this.occupiedCells),this.cellToWallMap.size}this.animatingWalls.delete(e),this.scene.remove(e),this.collisionSystem&&this.collisionSystem.removeCollider(e),setTimeout(()=>{this.cleanupParticleSystem(e)},2e3),this.isBuilding&&this.previewMesh&&(this.previewMesh.rotation.y=this.currentRotation,this.previewMesh.updateMatrixWorld(!0),this.updatePreview()),`${e.position.x}${e.position.y}${e.position.z}`}toggleBuildingMode(){this.isBuilding?this.exitBuildingMode():this.enterBuildingMode()}enterBuildingMode(){this.isBuilding=!0,this.switchToLevel(0),this.previewMesh&&(this.scene.remove(this.previewMesh),this.previewMesh=null),this.updatePreview(),this.showBuildingUI(),this.showSelectionScreen(),this.isBuilding,this.currentLevel,this.getCurrentLevelY()}exitBuildingMode(){this.isBuilding=!1,this.updateGridVisibility(),this.previewMesh&&(this.previewMesh.visible=!1),this.hideResourceWarning(),this.hideBuildingUI(),this.hideSelectionScreen()}showBuildingUI(){const e=document.getElementById("build-mode-prompt");e&&(e.style.opacity="0",e.style.pointerEvents="none");let t=document.getElementById("buildingText");t||(t=document.createElement("div"),t.id="buildingText",t.style.cssText=`
        position: fixed;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
        border: 3px solid #DEB887;
        border-radius: 20px;
        padding: 15px 25px;
        color: #F5DEB3;
        font-family: 'Nunito', Arial, sans-serif;
        font-size: 14px;
        text-align: center;
        z-index: 200;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), inset 0 2px 5px rgba(245, 222, 179, 0.1);
        pointer-events: none;
        backdrop-filter: blur(10px);
      `,document.body.appendChild(t)),this.updateBuildingUI(),t.style.display="block"}updateBuildingUI(){const e=document.getElementById("buildingText");if(!e)return;const t=this.buildingMode==="build"?"🔨":"🗑️",n=this.buildingMode==="build"?"Build":"Break";if(this.buildingMode==="build"){const i=this.buildableObjects[this.selectedBuildObject],s=this.hasRequiredResources(),r=s?"#90EE90":"#FF6B6B";e.innerHTML=`
        <div style="margin-bottom: 6px;">
          <strong style="
            color: #F5DEB3; 
            font-family: 'Fredoka One', Arial, sans-serif;
            font-size: 16px;
          ">${t} Selected: ${i.name}</strong>
        </div>
        <div style="
          color: ${r}; 
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 13px;
        ">
          🪵 Cost: ${i.cost.wood} Wood ${s?"✓":"✗"}
        </div>
        <div style="
          font-size: 12px;
          color: #DEB887;
          font-weight: 500;
        ">
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>R</strong> Rotate</span>
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>X</strong> Switch</span>
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>V</strong> Exit</span>
        </div>
      `}else e.innerHTML=`
        <div style="margin-bottom: 6px;">
          <strong style="
            color: #F5DEB3; 
            font-family: 'Fredoka One', Arial, sans-serif;
            font-size: 16px;
          ">${t} ${n} Mode</strong>
        </div>
        <div style="
          font-size: 12px;
          color: #DEB887;
          font-weight: 500;
        ">
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>X</strong> Switch</span>
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>V</strong> Exit</span>
        </div>
      `}hideBuildingUI(){const e=document.getElementById("buildingText");e&&(e.style.display="none");const t=document.getElementById("build-mode-prompt");t&&(t.style.opacity="1",t.style.pointerEvents="auto")}destroy(){this.exitBuildingMode(),this.keydownHandler&&document.removeEventListener("keydown",this.keydownHandler),this.keyupHandler&&document.removeEventListener("keyup",this.keyupHandler),this.builtWalls.forEach(t=>{this.scene.remove(t),this.collisionSystem&&this.collisionSystem.removeCollider(t)}),this.builtWalls=[],this.objectsRegistry.clearBuiltObjects(),this.occupiedCells.clear(),this.cellToWallMap.clear(),this.previewMesh&&this.scene.remove(this.previewMesh),this.hideBuildingUI();const e=document.getElementById("buildingText");e&&e.remove()}createDebugIndicator(e){const[t,n]=e.split(",").map(Number),i=t*this.gridSize,s=n*this.gridSize,r=new je(.3,.1,.3),a=new Xt({color:16729156,transparent:!0,opacity:.7}),l=new Le(r,a);l.position.set(i,6.1,s),this.scene.add(l),this.debugIndicators.set(e,l)}removeDebugIndicator(e){const t=this.debugIndicators.get(e);t&&(this.scene.remove(t),this.debugIndicators.delete(e))}toggleDebugIndicators(){this.showDebugIndicators=!this.showDebugIndicators,this.showDebugIndicators?(this.levelManager.getCurrentLevelOccupiedCells().forEach(t=>{this.createDebugIndicator(t)}),`${this.levelManager.getCurrentLevel()}`):(this.debugIndicators.forEach((e,t)=>{this.scene.remove(e)}),this.debugIndicators.clear())}checkPhysicalIntersection(e,t){const n=this.getOccupiedCells(e,t);this.buildableObjects[this.selectedBuildObject];for(const i of n)if(this.levelManager.isCellOccupiedOnCurrentLevel(i))return`${i}${this.levelManager.getCurrentLevel()}`,!0;return!1}playPlacementAnimation(e){this.animatingWalls.add(e);const t=e.scale.clone(),n=e.position.clone(),i=e.rotation.clone();e.traverse(l=>{l.isMesh&&l.material&&(l.material=l.material.clone())}),e.scale.setScalar(.1),e.position.y=n.y+2,this.createWoodChipParticles(e,n);const s=800,r=Date.now(),a=()=>{const l=Date.now()-r,c=Math.min(l/s,1),d=(p=>p<1/2.75?7.5625*p*p:p<2/2.75?(p-=1.5/2.75,7.5625*p*p+.75):p<2.5/2.75?(p-=2.25/2.75,7.5625*p*p+.9375):(p-=2.625/2.75,7.5625*p*p+.984375))(c),u=.1+(t.x-.1)*d;e.scale.setScalar(u),e.position.x=n.x,e.position.y=n.y+2*(1-d),e.position.z=n.z,e.rotation.copy(i),c<1?requestAnimationFrame(a):(e.scale.copy(t),e.position.copy(n),e.rotation.copy(i),this.animatingWalls.delete(e),setTimeout(()=>{this.cleanupParticleSystem(e)},2e3))};a()}createWoodChipParticles(e,t){const i=[];for(let s=0;s<15;s++){const r=this.createWoodChip(),a=s/15*Math.PI*2,l=.8+Math.random()*.4;r.position.set(t.x+Math.cos(a)*l,t.y+.5+Math.random()*.5,t.z+Math.sin(a)*l),r.rotation.set(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2),r.userData.velocity=new T((Math.random()-.5)*3,Math.random()*2+1,(Math.random()-.5)*3),r.userData.angularVelocity=new T((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8),r.userData.startTime=Date.now(),r.userData.lifetime=1500+Math.random()*1e3,this.scene.add(r),i.push(r)}this.particleSystems.set(e,i),this.animateParticles(i)}createDestructionParticles(e,t){const i=[];for(let s=0;s<25;s++){const r=this.createDebris(),a=s/25*Math.PI*2,l=.5+Math.random()*.8;r.position.set(t.x+Math.cos(a)*l,t.y+.3+Math.random()*.8,t.z+Math.sin(a)*l),r.rotation.set(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2),r.userData.velocity=new T((Math.random()-.5)*6,Math.random()*3+2,(Math.random()-.5)*6),r.userData.angularVelocity=new T((Math.random()-.5)*12,(Math.random()-.5)*12,(Math.random()-.5)*12),r.userData.startTime=Date.now(),r.userData.lifetime=2e3+Math.random()*1500,this.scene.add(r),i.push(r)}this.particleSystems.set(e,i),this.animateParticles(i)}createWoodChip(){const e=.08+Math.random()*.04,t=.02+Math.random()*.02,n=.12+Math.random()*.06,i=new je(e,t,n),s=new We({color:new ce().setHSL(.08+Math.random()*.05,.6,.4+Math.random()*.2)}),r=new Le(i,s);return r.castShadow=!0,r}createDebris(){const e=Math.random();let t,n;if(e<.4){const s=.06+Math.random()*.08,r=.03+Math.random()*.04,a=.08+Math.random()*.1;t=new je(s,r,a)}else if(e<.7){const s=.04+Math.random()*.06;t=new qt(s,6,4),t.scale(1+Math.random()*.5,.5+Math.random()*.5,1+Math.random()*.5)}else{const s=.02+Math.random()*.02,r=.01+Math.random()*.01,a=.15+Math.random()*.1;t=new je(s,r,a)}n=new We({color:new ce().setHSL(.05+Math.random()*.08,.4+Math.random()*.4,.2+Math.random()*.3)});const i=new Le(t,n);return i.castShadow=!0,i}animateParticles(e){const t=()=>{const n=Date.now();let i=0;e.forEach(s=>{const a=(n-s.userData.startTime)/s.userData.lifetime;if(a<1){i++;const l=.016;s.userData.velocity.y-=9.8*l,s.position.add(s.userData.velocity.clone().multiplyScalar(l)),s.rotation.x+=s.userData.angularVelocity.x*l,s.rotation.y+=s.userData.angularVelocity.y*l,s.rotation.z+=s.userData.angularVelocity.z*l;const c=Math.max(0,(a-.7)/.3);s.material.opacity=1-c,s.material.transparent=c>0,s.position.y<=6.05&&(s.position.y=6.05,s.userData.velocity.y*=-.3,s.userData.velocity.x*=.8,s.userData.velocity.z*=.8)}else this.scene.remove(s)}),i>0&&requestAnimationFrame(t)};t()}cleanupParticleSystem(e){const t=this.particleSystems.get(e);t&&(t.forEach(n=>{this.scene.remove(n)}),this.particleSystems.delete(e))}hasRequiredResources(){if(!this.inventory)return!0;const e=this.buildableObjects[this.selectedBuildObject],t=e?e.cost:this.wallCost;return this.inventory.hasItem("wood",t.wood)}consumeResources(){if(!this.inventory)return;const e=this.buildableObjects[this.selectedBuildObject],t=e?e.cost:this.wallCost;this.inventory.removeItem("wood",t.wood),`${t.wood}${e.name}`}showResourceWarning(){let e=document.getElementById("resourceWarning");e||(e=document.createElement("div"),e.id="resourceWarning",e.style.cssText=`
        position: fixed;
        color: #ff4444;
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: bold;
        z-index: 3000;
        pointer-events: none;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        white-space: nowrap;
      `,document.body.appendChild(e)),e.textContent="Not enough resources",e.style.display="block",this.updateCursorWarningPosition()}hideResourceWarning(){const e=document.getElementById("resourceWarning");e&&(e.style.display="none")}updateCursorWarningPosition(){const e=document.getElementById("resourceWarning");if(!e||e.style.display==="none")return;this.camera.domElement?.getBoundingClientRect();const t=(this.mouse.x+1)/2*window.innerWidth,n=(-this.mouse.y+1)/2*window.innerHeight;e.style.left=t+15+"px",e.style.top=n-25+"px"}setInventory(e){this.inventory=e}returnResources(e){if(!this.inventory||!e.userData.isBuildingWall)return;const t=this.buildableObjects.wall;if(!t)return;const n=t.cost.wood,i=Math.floor(n/2);if(`${n}`,`${i}${n}`,`${this.inventory.getItemCount("wood")}`,i>0){const s={id:"wood",name:"Wood",type:"material",stackSize:64};`${i}`;const r=this.inventory.addItem(s,i);`${r}`,`${this.inventory.getItemCount("wood")}`,r===i?(`${r}${t.name}${n}`,this.showFloatingText(`+${r} Wood`,e.position,"#4CAF50")):r>0?(console.warn(`Only returned ${r} wood instead of ${i} - inventory may be full`),this.showFloatingText(`+${r} Wood (Inventory Full)`,e.position,"#FF9800")):(console.warn("Could not return any wood - inventory is full"),this.showFloatingText("Inventory Full!",e.position,"#f44"))}else`${t.name}${n}`,this.showFloatingText("No Resources Returned",e.position,"#888")}showFloatingText(e,t,n="#fff"){const i=this.worldToScreen(t);if(!i)return;const s=document.createElement("div");s.style.cssText=`
      position: fixed;
      left: ${i.x}px;
      top: ${i.y}px;
      color: ${n};
      font-family: Arial, sans-serif;
      font-size: 16px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      pointer-events: none;
      z-index: 5000;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    `,s.textContent=e,document.body.appendChild(s),this.animateFloatingText(s)}worldToScreen(e){const t=e.clone();if(t.project(this.camera),t.z>1)return null;const n=(t.x+1)*window.innerWidth/2,i=(-t.y+1)*window.innerHeight/2;return{x:n,y:i}}animateFloatingText(e){const t=Date.now(),n=2500,i=parseFloat(e.style.top),s=i-80,r=()=>{const a=Date.now()-t,l=Math.min(a/n,1),h=(p=>1-Math.pow(1-p,3))(l),d=i+(s-i)*h;e.style.top=d+"px";const u=Math.max(0,(l-.7)/.3);e.style.opacity=1-u,l<1?requestAnimationFrame(r):e.parentNode&&e.parentNode.removeChild(e)};r()}setItemRegistry(e){this.itemRegistry=e}initializeSelectionPreviews(){setTimeout(()=>{Object.entries(this.buildableObjects).forEach(([e,t])=>{t.mesh?(`${e}`,t.mesh,this.create3DPreview(e,t)):console.warn(`No mesh found for ${e}, skipping preview`)})},100)}create3DPreview(e,t){const n=document.getElementById(`preview-${e}`);if(!n){console.warn(`Preview container not found for ${e}`);return}`${e}`,n.innerHTML="";const i=new Rr;i.background=new ce(2236962);const s=new _t(45,1,.1,100),r=new As({antialias:!0,alpha:!1,preserveDrawingBuffer:!0});r.setSize(50,50),r.setClearColor(2236962),r.shadowMap.enabled=!1;const a=new Rs(16777215,.8);i.add(a);const l=new xi(16777215,1);l.position.set(2,2,2),i.add(l);const c=new xi(16777215,.5);c.position.set(-2,1,-2),i.add(c);const h=t.mesh.clone();`${e}`,h.scale.setScalar(1),h.traverse(x=>{x.isMesh&&x.material&&(x.material=x.material.clone(),x.castShadow=!1,x.receiveShadow=!1,x.material.transparent=!1,x.material.opacity=1,x.visible=!0)}),i.add(h),`${e}`;const d=new Yt().setFromObject(h),u=d.getCenter(new T),p=d.getSize(new T),y=Math.max(p.x,p.y,p.z)*1.5;s.position.set(u.x+y*.7,u.y+y*.3,u.z+y*.7),h.rotation.y=Math.PI/6,s.lookAt(u),s.near=y*.1,s.far=y*10,s.updateProjectionMatrix();let m=.01;const f=()=>{n.parentNode&&(h.rotation.y+=m,r.render(i,s),requestAnimationFrame(f))};r.render(i,s),n.appendChild(r.domElement),f(),this.selectionPreviews||(this.selectionPreviews=new Map),this.selectionPreviews.set(e,{scene:i,camera:s,renderer:r,model:h})}getBuiltObjectsByType(e){return this.objectsRegistry.getBuiltObjectsByType(e)}getAllBuiltObjects(){return this.objectsRegistry.getAllBuiltObjects()}getBuiltObjectCount(e){return this.objectsRegistry.getBuiltObjectCount(e)}getBuiltWalls(){return this.builtWalls}getAllBuiltObjectsForSaving(){return this.saveManager.getAllBuiltObjectsForSaving()}getBuiltRegularWalls(){return this.getBuiltObjectsByType("wall")}getBuiltSpikedWalls(){return this.getBuiltObjectsByType("spikedWall")}}class Sv{constructor(){this.compassStrip=null,this.compassDegrees=null}initialize(){this.compassStrip=document.getElementById("compassStrip"),this.compassDegrees=document.getElementById("compassDegrees"),this.createCompassDirections()}createCompassDirections(){if(!this.compassStrip)return;const e=this.compassStrip;e.innerHTML="";const t=[{name:"N",angle:0},{name:"E",angle:90},{name:"S",angle:180},{name:"W",angle:270}];for(let n=0;n<6;n++)t.forEach(i=>{const s=document.createElement("div");s.className="compass-direction",s.textContent=i.name;const a=(i.angle+n*360)/360*300;s.style.left=`${a}px`,e.appendChild(s)})}update(e){if(!this.compassStrip||!this.compassDegrees||!e)return;const t=new T;e.getWorldDirection(t);const i=Math.atan2(t.x,t.z)*180/Math.PI;this.compassDegrees.textContent=`${Math.round(i)}°`;const s=-(i*300/360);this.compassStrip.style.transform=`translateX(${s}px)`}}class wv{constructor(e){this.game=e,this.isVisible=!1,this.uPressed=!1,this.treePivotDots=[],this.dogDetectionRangeHelper=null,this.setupEventListeners(),this.setupHandItemEditor()}setupEventListeners(){document.addEventListener("keydown",e=>{e.code==="KeyU"&&(this.uPressed=!0),e.code==="Digit1"&&this.uPressed&&this.toggle()}),document.addEventListener("keyup",e=>{e.code==="KeyU"&&(this.uPressed=!1)})}setupHandItemEditor(){document.getElementById("handItemEditor")||(document.body.insertAdjacentHTML("beforeend",`
      <div id="handItemEditor" style="display: none; position: fixed; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.8); padding: 15px; border-radius: 8px; color: white; font-family: monospace; font-size: 12px; z-index: 1000; width: 280px;">
        <div style="color: #4CAF50; font-weight: bold; margin-bottom: 10px; text-align: center;">Hand Item Editor</div>
        
        <div style="margin-bottom: 15px;">
          <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Position</div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #ff6b6b; width: 20px;">X:</label>
            <input type="range" id="handPosX" min="-0.5" max="0.5" step="0.01" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handPosXVal" step="0.01" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #4ecdc4; width: 20px;">Y:</label>
            <input type="range" id="handPosY" min="-0.5" max="0.5" step="0.01" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handPosYVal" step="0.01" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #45b7d1; width: 20px;">Z:</label>
            <input type="range" id="handPosZ" min="-0.5" max="0.5" step="0.01" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handPosZVal" step="0.01" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
        </div>
        <div style="margin-bottom: 15px;">
          <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Rotation (degrees)</div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #ff6b6b; width: 20px;">X:</label>
            <input type="range" id="handRotX" min="-180" max="180" step="5" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handRotXVal" step="5" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #4ecdc4; width: 20px;">Y:</label>
            <input type="range" id="handRotY" min="-180" max="180" step="5" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handRotYVal" step="5" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #45b7d1; width: 20px;">Z:</label>
            <input type="range" id="handRotZ" min="-180" max="180" step="5" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handRotZVal" step="5" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button id="resetHandTransform" style="flex: 1; background: #ff4757; border: none; color: white; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">Reset</button>
          <button id="copyHandTransform" style="flex: 1; background: #2ed573; border: none; color: white; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">Copy Values</button>
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
          <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Health Debug</div>
          <div style="display: flex; gap: 8px;">
            <button id="takeDamageBtn" style="flex: 1; background: #e74c3c; border: none; color: white; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Take Damage</button>
            <button id="healBtn" style="flex: 1; background: #27ae60; border: none; color: white; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Heal</button>
          </div>
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
          <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Item Debug</div>
          <div style="display: flex; gap: 8px;">
            <button id="giveWoodBtn" style="flex: 1; background: #8B4513; border: none; color: white; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Give 9,999,999 Wood</button>
          </div>
        </div>
      </div>
    `),this.setupHandItemEditorListeners())}setupHandItemEditorListeners(){["X","Y","Z"].forEach(r=>{const a=document.getElementById(`handPos${r}`),l=document.getElementById(`handPos${r}Val`);if(a&&l){const c=h=>{a.value=h,l.value=h,this.updateHandItemTransform()};a.addEventListener("input",h=>c(h.target.value)),l.addEventListener("input",h=>c(h.target.value))}}),["X","Y","Z"].forEach(r=>{const a=document.getElementById(`handRot${r}`),l=document.getElementById(`handRot${r}Val`);if(a&&l){const c=h=>{a.value=h,l.value=h,this.updateHandItemTransform()};a.addEventListener("input",h=>c(h.target.value)),l.addEventListener("input",h=>c(h.target.value))}});const e=document.getElementById("resetHandTransform");e&&e.addEventListener("click",()=>{["X","Y","Z"].forEach(r=>{document.getElementById(`handPos${r}`).value="0",document.getElementById(`handPos${r}Val`).value="0",document.getElementById(`handRot${r}`).value="0",document.getElementById(`handRot${r}Val`).value="0"}),this.updateHandItemTransform()});const t=document.getElementById("copyHandTransform");t&&t.addEventListener("click",()=>{const r=document.getElementById("handPosXVal").value,a=document.getElementById("handPosYVal").value,l=document.getElementById("handPosZVal").value,c=document.getElementById("handRotXVal").value,h=document.getElementById("handRotYVal").value,d=document.getElementById("handRotZVal").value,u=`Position: (${r}, ${a}, ${l})
Rotation: (${c}°, ${h}°, ${d}°)`;navigator.clipboard.writeText(u).then(()=>{t.textContent="Copied!",setTimeout(()=>t.textContent="Copy Values",1e3)})});const n=document.getElementById("takeDamageBtn"),i=document.getElementById("healBtn");n&&n.addEventListener("click",()=>{this.game.healthSystem&&this.game.healthSystem.takeDamage(1)}),i&&i.addEventListener("click",()=>{this.game.healthSystem&&this.game.healthSystem.heal(1)});const s=document.getElementById("giveWoodBtn");s&&s.addEventListener("click",()=>{if(this.game.inventory&&this.game.itemRegistry){const r=this.game.itemRegistry.wood;r?(this.game.inventory.addItem(r,9999999),s.textContent="Wood Added!",setTimeout(()=>s.textContent="Give 9,999,999 Wood",1e3)):(console.error("Wood item not found in item registry"),s.textContent="Failed!",setTimeout(()=>s.textContent="Give 9,999,999 Wood",2e3))}})}createStepVisual(){this.removeStepVisual();let e=null;if(this.game.player?.mesh?e=this.game.player.mesh:this.game.player?e=this.game.player:window.gameInstance?.player?.mesh?e=window.gameInstance.player.mesh:window.gameInstance?.player&&(e=window.gameInstance.player),!e)return;let t=.5;this.game.player?.characterController?t=this.game.player.characterController.stepHeight||.5:this.game.characterController?t=this.game.characterController.stepHeight||.5:window.gameInstance?.player?.characterController?t=window.gameInstance.player.characterController.stepHeight||.5:window.gameInstance?.characterController&&(t=window.gameInstance.characterController.stepHeight||.5);const n=new ln(.6,.6,t,12),i=new Xt({color:65280,wireframe:!0,transparent:!0,opacity:.8});this.stepVisualMesh=new Le(n,i),this.stepVisualMesh.name="stepHeightVisual",this.stepVisualMesh.position.copy(e.position),this.stepVisualMesh.position.y+=t/2,this.game.scene.add(this.stepVisualMesh),`${t}`}removeStepVisual(){this.stepVisualMesh&&(this.game.scene.remove(this.stepVisualMesh),this.stepVisualMesh=null)}updateStepVisual(){const e=document.getElementById("showStepVisual");e&&e.checked&&this.createStepVisual()}updateVisuals(){if(this.stepVisualMesh){let e=null;if(this.game.player?.mesh?e=this.game.player.mesh:this.game.player?e=this.game.player:window.gameInstance?.player?.mesh?e=window.gameInstance.player.mesh:window.gameInstance?.player&&(e=window.gameInstance.player),e){this.stepVisualMesh.position.copy(e.position);let t=.5;this.game.player?.characterController?t=this.game.player.characterController.stepHeight||.5:this.game.characterController?t=this.game.characterController.stepHeight||.5:window.gameInstance?.player?.characterController?t=window.gameInstance.player.characterController.stepHeight||.5:window.gameInstance?.characterController&&(t=window.gameInstance.characterController.stepHeight||.5),this.stepVisualMesh.position.y+=t/2}}}updateHandItemTransform(){const e=this.game.player;if(!e||!e.heldItemMesh)return;const t=parseFloat(document.getElementById("handPosXVal").value),n=parseFloat(document.getElementById("handPosYVal").value),i=parseFloat(document.getElementById("handPosZVal").value),s=parseFloat(document.getElementById("handRotXVal").value)*Math.PI/180,r=parseFloat(document.getElementById("handRotYVal").value)*Math.PI/180,a=parseFloat(document.getElementById("handRotZVal").value)*Math.PI/180;e.heldItemMesh.position.set(t,n,i),e.heldItemMesh.rotation.set(s,r,a)}toggle(){this.isVisible=!this.isVisible,["heldItemPosition","playerPosition","playerHeightControl","occupiedSlots","handItemEditor"].forEach(t=>{const n=document.getElementById(t);n&&(n.style.display=this.isVisible?"block":"none")}),this.game.collisionSystem&&(this.isVisible?(this.game.collisionSystem.showDebugVisualization(),this.game.collisionSystem.showPlayerColliderVisualization()):(this.game.collisionSystem.hideDebugVisualization(),this.game.collisionSystem.hidePlayerColliderVisualization())),this.game.buildingSystem&&this.game.buildingSystem.toggleDebugIndicators(),this.isVisible?this.showTreePivotDots():this.hideTreePivotDots(),this.isVisible?this.showDogDetectionRange():this.hideDogDetectionRange(),this.isVisible&&this.game.player&&this.game.player.heldItemMesh&&this.syncHandItemEditorValues(),this.isVisible}syncHandItemEditorValues(){const e=this.game.player;if(!e||!e.heldItemMesh)return;const t=e.heldItemMesh.position,n=e.heldItemMesh.rotation;document.getElementById("handPosX").value=t.x.toFixed(2),document.getElementById("handPosXVal").value=t.x.toFixed(2),document.getElementById("handPosY").value=t.y.toFixed(2),document.getElementById("handPosYVal").value=t.y.toFixed(2),document.getElementById("handPosZ").value=t.z.toFixed(2),document.getElementById("handPosZVal").value=t.z.toFixed(2),document.getElementById("handRotX").value=Math.round(n.x*180/Math.PI),document.getElementById("handRotXVal").value=Math.round(n.x*180/Math.PI),document.getElementById("handRotY").value=Math.round(n.y*180/Math.PI),document.getElementById("handRotYVal").value=Math.round(n.y*180/Math.PI),document.getElementById("handRotZ").value=Math.round(n.z*180/Math.PI),document.getElementById("handRotZVal").value=Math.round(n.z*180/Math.PI)}updateOccupiedSlotsDebug(){const e=document.getElementById("occupiedSlotsList");if(!e||!this.game.buildingSystem)return;const t=document.getElementById("occupiedSlots");if(!t||t.style.display==="none")return;const n=Array.from(this.game.buildingSystem.occupiedCells);if(n.length===0)e.innerHTML='<span style="color: #888;">None</span>';else{n.sort();const i=new Map;n.forEach(a=>{const l=this.game.buildingSystem.cellToWallMap.get(a);if(l){const c=this.game.buildingSystem.builtWalls.indexOf(l);i.has(c)||i.set(c,[]),i.get(c).push(a)}});let s="",r=0;for(const[a,l]of i){const c=`hsl(${r*60%360}, 70%, 60%)`;s+='<div style="margin-bottom: 8px;">',s+=`<div style="color: ${c}; font-weight: bold;">Wall ${a+1}:</div>`,s+='<div style="margin-left: 10px; font-size: 11px;">',l.forEach(h=>{s+=`<div style="color: #ccc;">${h}</div>`}),s+="</div></div>",r++}s+='<div style="margin-top: 10px; font-size: 11px; color: #888;">',s+=`Total: ${n.length} slots`,s+="</div>",e.innerHTML=s}}update(){this.isVisible&&(this.updateDogDetectionRange(),this.updateStepDetectionVisualization())}showTreePivotDots(){this.hideTreePivotDots(),!(!this.game.environment||!this.game.environment.loadedTrees)&&(`${this.game.environment.loadedTrees.length}`,this.game.environment.loadedTrees.forEach((e,t)=>{const n=new qt(.2,8,8),i=new Xt({color:16711680,transparent:!1}),s=new Le(n,i);s.position.copy(e.mesh.position),s.name=`treePivotDot_${t}`,this.treePivotDots.push(s),this.game.scene.add(s),`${t}${s.position.x.toFixed(1)}${s.position.y.toFixed(1)}${s.position.z.toFixed(1)}`}),`${this.treePivotDots.length}`)}hideTreePivotDots(){this.treePivotDots.forEach(e=>{this.game.scene.remove(e)}),this.treePivotDots=[]}showDogDetectionRange(){if(this.hideDogDetectionRange(),!this.game.dogCompanion||!this.game.dogCompanion.mesh)return;const e=150,t=new qt(e,16,12),n=new Xt({color:65280,wireframe:!0,transparent:!0,opacity:.3});this.dogDetectionRangeHelper=new Le(t,n),this.dogDetectionRangeHelper.name="dogDetectionRange",this.dogDetectionRangeHelper.position.copy(this.game.dogCompanion.mesh.position),this.game.scene.add(this.dogDetectionRangeHelper),`${e}`}hideDogDetectionRange(){this.dogDetectionRangeHelper&&(this.game.scene.remove(this.dogDetectionRangeHelper),this.dogDetectionRangeHelper=null)}updateDogDetectionRange(){this.dogDetectionRangeHelper&&this.game.dogCompanion&&this.game.dogCompanion.mesh&&this.dogDetectionRangeHelper.position.copy(this.game.dogCompanion.mesh.position)}destroy(){this.hideTreePivotDots(),this.hideDogDetectionRange(),this.hideStepDetectionVisualization()}}class Ev{constructor(e,t,n,i,s,r){this.scene=e,this.camera=t,this.inventory=n,this.itemRegistry=i,this.environment=s,this.itemDropSystem=r,this.raycaster=new Fr,this.mouse=new Ee,this.treeHealth=new Map,this.maxTreeHealth=5,this.woodPerHit=2,this.appleTreeDrops=new Map,this.maxApplesPerTree=3,this.choppingRange=4,this.player=null,this.hitEffects=[],this.mouseIndicator=null,this.hoveredTree=null,this.createMouseIndicator(),this.handleMouseMove=this.handleMouseMove.bind(this),window.addEventListener("mousemove",this.handleMouseMove)}setPlayer(e){this.player=e}handleClick(e){const t=this.inventory.getSelectedItem();if(!t||t.item.id!=="axe")return;if(!this.player||!this.player.mesh){console.warn("Player reference not available for tree chopping");return}if(!this.player.canPerformAxeHit())return;this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.getAllTreeMeshes(),i=this.raycaster.intersectObjects(n,!0);if(i.length>0){const s=i[0].object,r=this.findTreeRoot(s);if(r){const a=this.player.mesh.position,l=r.position,c=a.distanceTo(l);c<=this.choppingRange?this.player.playAxeHitAnimation()&&setTimeout(()=>{this.chopTree(r,i[0].point)},300):`${c.toFixed(2)}${this.choppingRange}`}}}getAllTreeMeshes(){const e=[];return this.scene.traverse(t=>{t.name&&t.name.includes("treeCollider")||this.isTreeMesh(t)&&e.push(t)}),e}isTreeMesh(e){if(!e.isMesh||e.name&&e.name.includes("treeCollider")||e.userData&&e.userData.isBeingDestroyed)return!1;let t=e.parent;for(;t&&t!==this.scene;){if(t.userData&&t.userData.isBeingDestroyed)return!1;t=t.parent}let n=e;for(;n;){if(n.name&&n.name.includes("treeCollider"))return!1;if(n.name&&(n.name.includes("tree")||n.name.includes("Tree")||n.name.includes("apple")||n.name.includes("Apple"))||n.parent&&n.parent.name&&(n.parent.name.includes("tree")||n.parent.name.includes("Tree")||n.parent.name.includes("apple")||n.parent.name.includes("Apple")))return!0;if(n=n.parent,n===this.scene)break}return!1}findTreeRoot(e){let t=e,n=null;for(;t&&t!==this.scene;)(t.type==="Group"||t.isMesh&&this.isTreeMesh(t))&&(n=t),t=t.parent;return n||e}chopTree(e,t){if(e.name,e.position,e.type,e.userData.isBeingDestroyed)return;this.treeHealth.has(e)||this.treeHealth.set(e,this.maxTreeHealth);let n=this.treeHealth.get(e);n--,this.treeHealth.set(e,n),`${n}${this.maxTreeHealth}`;const i=this.isAppleTree(e);if(i){const r=this.appleTreeDrops.get(e)||0,a=this.maxApplesPerTree-r;if(`${r}${this.maxApplesPerTree}${a}`,a>0){const l=Math.min(a,Math.ceil(Math.random()*2));`${l}`,this.appleTreeDrops.set(e,r+l),this.dropAppleItems(t,l)}}this.itemRegistry.wood&&this.itemDropSystem&&(this.dropWoodItems(t,this.woodPerHit),`${this.woodPerHit}${n}${this.maxTreeHealth}`),this.createHitEffect(t),this.playTreeHitAnimation(e),this.applyTreeDamageEffect(e,n),n<=0&&this.destroyTree(e)}createHitEffect(e){const n=new Dt;for(let i=0;i<10;i++){const s=new je(.05,.05,.05),r=new We({color:9127187}),a=new Le(s,r);a.position.copy(e),a.position.x+=(Math.random()-.5)*.5,a.position.y+=(Math.random()-.5)*.5,a.position.z+=(Math.random()-.5)*.5,a.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),a.userData.velocity=new T((Math.random()-.5)*2,Math.random()*2+1,(Math.random()-.5)*2),a.userData.life=1,n.add(a)}this.scene.add(n),this.hitEffects.push({particles:n,startTime:Date.now()}),this.cleanupOldEffects()}applyTreeDamageEffect(e,t){if(t>=this.maxTreeHealth)return;const n=1-t/this.maxTreeHealth;e.traverse(i=>{if(i.isMesh&&i.material){const s=i.userData.originalColor||i.material.color.clone();i.userData.originalColor||(i.userData.originalColor=s.clone());const r=s.clone().lerp(new ce(4864554),n*.5);i.material.color.copy(r),n>.6?(i.material.transparent=!0,i.material.opacity=1-(n-.6)*.5):(i.material.transparent=!1,i.material.opacity=1)}})}destroyTree(e){e.userData.isBeingDestroyed=!0,this.treeHealth.delete(e),this.appleTreeDrops.delete(e),this.itemRegistry.wood&&this.itemDropSystem&&this.dropWoodItems(e.position,3),this.playTreeBreakAnimation(e,()=>{this.createDestructionEffect(e.position),this.scene.remove(e)}),this.removeTreeCollider(e)}removeTreeCollider(e){const t=[];this.scene.traverse(n=>{n.name&&n.name.includes("treeCollider")&&n.userData.associatedTree===e&&t.push(n)}),t.forEach(n=>{this.scene.remove(n),this.environment&&this.environment.collisionSystem&&this.environment.collisionSystem.removeCollider(n),n.name})}playTreeHitAnimation(e){e.userData.originalRotation||(e.userData.originalRotation=e.rotation.clone()),e.userData.hitAnimationId&&cancelAnimationFrame(e.userData.hitAnimationId);const t=.1,n=300,i=Date.now(),s=()=>{const a=(Date.now()-i)/n;if(a<1){const l=t*(1-a),c=(Math.random()-.5)*l,h=(Math.random()-.5)*l;e.rotation.x=e.userData.originalRotation.x+c,e.rotation.z=e.userData.originalRotation.z+h,e.userData.hitAnimationId=requestAnimationFrame(s)}else e.rotation.copy(e.userData.originalRotation),e.userData.hitAnimationId=null};s()}playTreeBreakAnimation(e,t){e.userData.originalScale||(e.userData.originalScale=e.scale.clone()),e.userData.originalPosition||(e.userData.originalPosition=e.position.clone()),e.userData.breakAnimationId&&cancelAnimationFrame(e.userData.breakAnimationId);const n=800,i=Date.now(),s=Math.random()*Math.PI*2,r=1.2,a=()=>{const l=Date.now()-i,c=Math.min(l/n,1);if(c<1){const h=1-Math.pow(1-c,4);e.rotation.z=e.userData.originalRotation.z+h*r*Math.cos(s),e.rotation.x=e.userData.originalRotation.x+h*r*Math.sin(s),e.position.y=e.userData.originalPosition.y-h*.5;const d=1-c*.2;e.scale.copy(e.userData.originalScale).multiplyScalar(d),e.userData.breakAnimationId=requestAnimationFrame(a)}else e.userData.breakAnimationId=null,t&&t()};a()}createDestructionEffect(e){const n=new Dt;for(let i=0;i<25;i++){const s=Math.random()<.4;let r,a;s?(r=new Ts(.1,.1),a=new We({color:2263842,transparent:!0,opacity:.8})):(r=new je(.08,.08,.08),a=new We({color:9127187}));const l=new Le(r,a);l.position.copy(e),l.position.x+=(Math.random()-.5)*3,l.position.y+=Math.random()*2,l.position.z+=(Math.random()-.5)*3,l.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),l.userData.velocity=new T((Math.random()-.5)*4,Math.random()*3+2,(Math.random()-.5)*4),l.userData.life=2,n.add(l)}this.scene.add(n),this.hitEffects.push({particles:n,startTime:Date.now()})}cleanupOldEffects(){const e=Date.now();for(let t=this.hitEffects.length-1;t>=0;t--){const n=this.hitEffects[t];(e-n.startTime)/1e3>3?(this.scene.remove(n.particles),this.hitEffects.splice(t,1)):n.particles.children.forEach(s=>{s.userData.velocity&&(s.position.add(s.userData.velocity.clone().multiplyScalar(.016)),s.userData.velocity.y-=.05,s.userData.life-=.016,s.material.transparent&&(s.material.opacity=Math.max(0,s.userData.life)))})}}update(){this.cleanupOldEffects(),this.updateTreeHighlighting()}updateTreeHighlighting(){}createMouseIndicator(){this.mouseIndicator=document.createElement("div"),this.mouseIndicator.style.cssText=`
      position: absolute;
      color: white;
      font-size: 12px;
      pointer-events: none;
      z-index: 1000;
      display: none;
    `,this.mouseIndicator.textContent="Click to chop tree",document.body.appendChild(this.mouseIndicator)}handleMouseMove(e){const t=this.inventory.getSelectedItem();if(!(t&&t.item.id==="axe")||!this.player||!this.player.mesh){this.hideMouseIndicator();return}this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const i=this.getAllTreeMeshes(),s=this.raycaster.intersectObjects(i,!0);if(s.length>0){const r=this.findTreeRoot(s[0].object);r?this.player.mesh.position.distanceTo(r.position)<=this.choppingRange?(this.showMouseIndicator(e.clientX,e.clientY),this.hoveredTree=r):(this.hideMouseIndicator(),this.hoveredTree=null):(this.hideMouseIndicator(),this.hoveredTree=null)}else this.hideMouseIndicator(),this.hoveredTree=null}showMouseIndicator(e,t){this.mouseIndicator.style.display="block",this.mouseIndicator.style.left=e+10+"px",this.mouseIndicator.style.top=t-20+"px"}hideMouseIndicator(){this.mouseIndicator.style.display="none"}destroy(){this.hitEffects.forEach(e=>{this.scene.remove(e.particles)}),this.hitEffects=[],this.treeHealth.clear(),this.appleTreeDrops.clear(),this.mouseIndicator&&(document.body.removeChild(this.mouseIndicator),this.mouseIndicator=null),window.removeEventListener("mousemove",this.handleMouseMove),this.scene.traverse(e=>{e.userData&&e.userData.hitAnimationId&&cancelAnimationFrame(e.userData.hitAnimationId),e.userData&&e.userData.breakAnimationId&&cancelAnimationFrame(e.userData.breakAnimationId)})}isAppleTree(e){let t=!1,n=e;for(;n&&n!==this.scene;){if(n.name&&n.name.toLowerCase().includes("apple")){t=!0;break}n=n.parent}if(t||e.traverse(i=>{i.name&&i.name.toLowerCase().includes("apple")&&(t=!0)}),!t&&this.environment&&this.environment.loadedTrees){const i=this.environment.loadedTrees.find(s=>s.mesh===e);i&&[3,4,8].includes(i.typeIndex)&&(t=!0,`${i.typeIndex}`)}if(!t&&this.environment&&this.environment.loadedTrees){const i=e.position,s=this.environment.loadedTrees.find(r=>r.mesh.position.distanceTo(i)<.1);s&&[3,4,8].includes(s.typeIndex)&&(t=!0,`${s.typeIndex}`)}return e.name,e.position,t}dropAppleItems(e,t){const n=this.itemRegistry.apple;if(!(!n||!this.itemDropSystem)){for(let i=0;i<t;i++){const s=Math.random()*Math.PI*2,r=2+Math.random()*3,a=3+Math.random()*2,l=new T(Math.cos(s)*r,a,Math.sin(s)*r),c=new T(e.x,e.y+1,e.z);setTimeout(()=>{this.itemDropSystem.dropItemWithPhysics(n,c,l)},i*75)}`${t}`}}dropWoodItems(e,t){const n=this.itemRegistry.wood;if(!(!n||!this.itemDropSystem))for(let i=0;i<t;i++){const s=Math.random()*Math.PI*2,r=2+Math.random()*3,a=3+Math.random()*2,l=new T(Math.cos(s)*r,a,Math.sin(s)*r),c=new T(e.x,e.y+1,e.z);setTimeout(()=>{this.itemDropSystem.dropItemWithPhysics(n,c,l)},i*50)}}}class Tv{constructor(e){this.scene=e,this.droppedItems=[],this.bobSpeed=.002,this.bobAmount=.1,this.rotationSpeed=.01,this.glowIntensity=.3,this.loader=new Cn,this.loadedModels={}}async dropItem(e,t,n=1){const i=await this.createItemMesh(e);i.position.copy(t),i.userData={itemId:e.id,quantity:n,bobOffset:Math.random()*Math.PI*2,initialY:t.y,dropTime:Date.now(),isPhysicsItem:!1},this.scene.add(i),this.droppedItems.push(i);const s=window.gameInstance;return s&&s.pickupableItems&&s.pickupableItems.push(i),`${n}${e.name}`,i}async dropItemWithPhysics(e,t,n,i=1){const s=await this.createItemMesh(e);s.position.copy(t),s.userData={itemId:e.id,quantity:i,bobOffset:Math.random()*Math.PI*2,initialY:t.y,dropTime:Date.now(),isPhysicsItem:!0,velocity:n.clone(),gravity:-35,bounceCount:0,maxBounces:1,bounceDamping:.1,groundY:6.3,hasLanded:!1},this.scene.add(s),this.droppedItems.push(s);const r=window.gameInstance;return r&&r.pickupableItems&&r.pickupableItems.push(s),`${i}${e.name}`,s}async createItemMesh(e){if(e.id==="apple")return await this.createAppleMesh();let t,n;switch(e.id){case"wood":t=new ln(.2,.2,.5,8),n=new We({color:9127187,emissive:2759178,emissiveIntensity:this.glowIntensity});break;case"stone":t=new ns(.12),n=new We({color:6710886,emissive:2236962,emissiveIntensity:this.glowIntensity});break;default:t=new je(.2,.2,.2),n=new We({color:5025616,emissive:1722906,emissiveIntensity:this.glowIntensity});break}const i=new Le(t,n);return i.castShadow=!0,i.receiveShadow=!1,i.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),i}async createAppleMesh(){if(this.loadedModels.apple){const e=this.loadedModels.apple.clone();return this.setupAppleMesh(e),e}try{const e=await this.loadModel("assets/apple.glb"),t=e.scene.clone();return this.loadedModels.apple=e.scene,this.setupAppleMesh(t),t}catch(e){console.error("Failed to load apple model, falling back to sphere:",e);const t=new qt(.15,12,8),n=new We({color:16729156,emissive:4460817,emissiveIntensity:this.glowIntensity}),i=new Le(t,n);return i.castShadow=!0,i.receiveShadow=!1,i}}setupAppleMesh(e){e.scale.set(.4,.4,.4),e.traverse(t=>{const n=t;if(n.isMesh){n.castShadow=!0,n.receiveShadow=!1;const i=n.material;if(i)if(Array.isArray(i))i.forEach(s=>{const r=s;r.emissive&&(r.emissive.setHex(4460817),r.emissiveIntensity=this.glowIntensity)});else{const s=i;s.emissive&&(s.emissive.setHex(4460817),s.emissiveIntensity=this.glowIntensity)}}}),e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI)}loadModel(e){return new Promise((t,n)=>{this.loader.load(e,t,void 0,n)})}update(){const e=Date.now(),t=1/60;for(let n=this.droppedItems.length-1;n>=0;n--){const i=this.droppedItems[n],s=i.userData;if(s.isPhysicsItem&&!s.hasLanded)this.updatePhysicsItem(i,s,t);else{const a=e*this.bobSpeed+s.bobOffset;s.hasLanded?i.position.y=s.groundY+Math.sin(a)*this.bobAmount:i.position.y=s.initialY+Math.sin(a)*this.bobAmount}i.rotation.y+=this.rotationSpeed,e-s.dropTime>3e5&&this.removeItem(i,n)}}updatePhysicsItem(e,t,n){t.velocity.y+=t.gravity*n,e.position.x+=t.velocity.x*n,e.position.y+=t.velocity.y*n,e.position.z+=t.velocity.z*n,e.position.y<=t.groundY&&(e.position.y=t.groundY,t.bounceCount<t.maxBounces&&Math.abs(t.velocity.y)>.1?(t.velocity.y=-t.velocity.y*t.bounceDamping,t.velocity.x*=t.bounceDamping,t.velocity.z*=t.bounceDamping,t.bounceCount++):(t.hasLanded=!0,t.velocity.set(0,0,0),t.initialY=t.groundY,`${t.itemId}`,e.position))}removeItem(e,t=-1){if(`${e.userData?.itemId}`,this.scene.remove(e),t>=0)this.droppedItems.splice(t,1);else{const s=this.droppedItems.indexOf(e);s!==-1&&this.droppedItems.splice(s,1)}const n=window.gameInstance;if(n&&n.pickupableItems){const s=n.pickupableItems.indexOf(e);s!==-1&&n.pickupableItems.splice(s,1)}e.userData.isRemoved=!0,e.userData.removeTime=Date.now();const i=e;i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(s=>s.dispose()):i.material.dispose()),`${e.userData?.itemId}`}destroy(){for(const e of this.droppedItems){this.scene.remove(e);const t=e;t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}this.droppedItems=[]}}class Av{constructor(){this.maxHealth=5,this.currentHealth=5,this.hearts=[],this.initializeHearts()}initializeHearts(){for(let e=1;e<=this.maxHealth;e++){const t=document.getElementById(`heart${e}`);t&&this.hearts.push(t)}this.updateHeartsDisplay(),this.maxHealth}updateHeartsDisplay(){this.hearts.forEach((e,t)=>{t<this.currentHealth?e.classList.remove("empty"):e.classList.add("empty")})}takeDamage(e=1){return this.currentHealth=Math.max(0,this.currentHealth-e),this.updateHeartsDisplay(),`${e}${this.currentHealth}${this.maxHealth}`,this.currentHealth<=0&&this.onDeath(),this.currentHealth}heal(e=1){const t=this.currentHealth;this.currentHealth=Math.min(this.maxHealth,this.currentHealth+e),this.updateHeartsDisplay();const n=this.currentHealth-t;return n>0&&(`${n}${this.currentHealth}${this.maxHealth}`,this.showHealEffect()),n}showHealEffect(){this.hearts.forEach((e,t)=>{t<this.currentHealth&&(e.style.filter="drop-shadow(0 0 10px #4CAF50) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))",setTimeout(()=>{e.style.filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))"},500))})}onDeath(){}isFullHealth(){return this.currentHealth>=this.maxHealth}getCurrentHealth(){return this.currentHealth}getMaxHealth(){return this.maxHealth}}class Iv{constructor(e,t){this.inventory=e,this.healthSystem=t,this.setupEventListeners()}setupEventListeners(){document.addEventListener("contextmenu",e=>{e.preventDefault(),this.useSelectedItem()})}useSelectedItem(){const e=this.inventory.getSelectedItem();if(!e||!e.item)return!1;const t=e.item;switch(t.type){case"consumable":return this.useConsumableItem(t,e);case"tool":case"weapon":return`${t.name}`,!1;default:return`${t.name}`,!1}}useConsumableItem(e,t){switch(e.id){case"apple":return this.eatApple(t);case"potion":return this.drinkPotion(t);default:return`${e.name}`,!1}}eatApple(e){return this.healthSystem.isFullHealth()?!1:this.healthSystem.heal(1)>0?(this.inventory.removeItem(e.item.id,1),this.showUseMessage("🍎 Ate apple (+1 heart)","#4CAF50"),!0):!1}drinkPotion(e){return this.healthSystem.heal(2)>0?(this.inventory.removeItem(e.item.id,1),this.showUseMessage("🧪 Drank potion (+2 hearts)","#9C27B0"),!0):!1}showUseMessage(e,t="#4CAF50"){const n=document.createElement("div");n.textContent=e,n.style.cssText=`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: ${t};
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      z-index: 1000;
      pointer-events: none;
      backdrop-filter: blur(5px);
    `,document.body.appendChild(n),setTimeout(()=>{n.style.transition="opacity 0.5s ease-out",n.style.opacity="0",setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n)},500)},1e3)}}class Cv{constructor(e,t){this.scene=e,this.player=t,this.mesh=null,this.mixer=null,this.animations={},this.currentAnimation=null,this.currentAnimationName=null,this.followDistance=3,this.minFollowDistance=1.5,this.wanderRadius=5,this.speed=5,this.rotationSpeed=8,this.groundLevel=0,this.gravity=-15,this.velocity=new T,this.isOnGround=!1,this.state="following",this.target=null,this.wanderTarget=null,this.wanderTimer=0,this.wanderCooldown=0,this.barkTimer=0,this.barkCooldown=0,this.fetchedItems=[],this.fetchTargets=[],this.maxCarryCapacity=15,this.returnToPlayer=!1,this.itemsInMouth=[],this.mouthContainer=null,this.loader=new Cn}async load(){try{const e=await this.loader.loadAsync("assets/dog_001.glb");if(this.mesh=e.scene,this.mesh.scale.setScalar(2),this.mesh.position.set(0,0,0),this.mesh.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0)}),e.animations&&e.animations.length>0)if(this.mixer=new ah(this.mesh),e.animations.forEach(t=>{const n=this.mixer.clipAction(t);this.animations[t.name]=n,t.name}),this.animations.idle)this.playAnimation("idle");else if(this.animations.Idle)this.playAnimation("Idle");else if(this.animations["T-Pose"])this.playAnimation("T-Pose");else{const t=Object.keys(this.animations)[0];t&&this.playAnimation(t)}return this.scene.add(this.mesh),this.createMouthContainer(),this.mesh}catch(e){console.error("Failed to load dog companion:",e);const t=new je(.5,.3,.8),n=new Is({color:9127187});return this.mesh=new Le(t,n),this.mesh.position.set(0,.15,0),this.scene.add(this.mesh),this.createMouthContainer(),this.mesh}}playAnimation(e){return!this.mixer||!this.animations[e]?(Object.keys(this.animations),!1):(this.currentAnimationName===e||(this.currentAnimation&&this.currentAnimation.fadeOut(.2),this.currentAnimation=this.animations[e],this.currentAnimationName=e,this.currentAnimation.reset().fadeIn(.2).play()),!0)}update(e,t=[]){if(!this.mesh||!this.player?.mesh)return;this.mixer&&this.mixer.update(e),this.updatePhysics(e),this.wanderTimer-=e,this.wanderCooldown-=e,this.barkTimer-=e,this.barkCooldown-=e;const n=this.player.mesh.position.clone(),i=this.mesh.position.clone(),s=i.distanceTo(n);if(t.length>0&&this.fetchedItems.length<this.maxCarryCapacity){const r=this.findNearestDroppedItem(t,i);r&&this.validateItemExists(r,t)&&i.distanceTo(r.position)<150&&!this.isAlreadyTargeted(r)&&this.hasItemBeenDroppedLongEnough(r)&&(this.state!=="fetching"?this.startFetching(r):this.addFetchTarget(r))}if(this.state==="fetching"&&!this.returnToPlayer&&this.fetchedItems.length<this.maxCarryCapacity){const r=this.findNextFetchTarget(t,i);r&&this.validateItemExists(r,t)&&i.distanceTo(r.position)<150&&this.hasItemBeenDroppedLongEnough(r)&&this.addFetchTarget(r)}switch(this.state){case"following":this.updateFollowing(e,n,i,s);break;case"wandering":this.updateWandering(e,n,i,s);break;case"fetching":this.updateFetching(e,n,i,t);break;case"idle":this.updateIdle(e,n,i,s);break}this.barkCooldown<=0&&Math.random()<.001&&(this.bark(),this.barkCooldown=Math.random()*10+5)}updatePhysics(e){const t=window.gameInstance;if(t?.collisionSystem){const n=t.collisionSystem.checkGroundCollision(this.mesh.position,1,.1);n.hasCollision?(this.mesh.position.y=n.groundHeight,this.velocity.y=0,this.isOnGround=!0):(this.isOnGround||(this.velocity.y+=this.gravity*e),this.mesh.position.y+=this.velocity.y*e,this.mesh.position.y<=this.groundLevel?(this.mesh.position.y=this.groundLevel,this.velocity.y=0,this.isOnGround=!0):this.isOnGround=!1)}else this.mesh.position.y=Math.max(this.mesh.position.y,this.groundLevel),this.velocity.y=0,this.isOnGround=!0}updateFollowing(e,t,n,i){if(i>this.followDistance){const s=new T().subVectors(t,n).normalize(),r=new T(s.x*this.speed*e,0,s.z*this.speed*e);this.mesh.position.add(r),this.tryPlayWalkAnimation(),this.rotateTowards(s,e)}else i<this.minFollowDistance?Math.random()<.1&&this.wanderCooldown<=0?this.startWandering():(this.state="idle",this.tryPlayIdleAnimation()):this.tryPlayIdleAnimation()}updateWandering(e,t,n,i){if(i>this.wanderRadius){this.state="following";return}if((!this.wanderTarget||this.wanderTimer<=0)&&(this.setRandomWanderTarget(t),this.wanderTimer=Math.random()*3+2),n.distanceTo(this.wanderTarget)>.5){const r=new T().subVectors(this.wanderTarget,n).normalize(),a=new T(r.x*this.speed*.5*e,0,r.z*this.speed*.5*e);this.mesh.position.add(a),this.tryPlayWalkAnimation(),this.rotateTowards(r,e)}else this.tryPlayIdleAnimation(),Math.random()<.3?this.state="following":this.setRandomWanderTarget(t)}updateFetching(e,t,n,i){if(this.fetchTargets=this.fetchTargets.filter(s=>this.validateItemExists(s,i)),this.fetchTargets.length===0&&this.fetchedItems.length===0){this.state="following",this.returnToPlayer=!1;return}if(!this.returnToPlayer&&this.fetchTargets.length>0){const s=this.fetchTargets[0];if(!this.validateItemExists(s,i)){this.fetchTargets.shift();return}const r=s.position;if(n.distanceTo(r)>.8){const l=new T().subVectors(r,n).normalize(),c=new T(l.x*this.speed*1.2*e,0,l.z*this.speed*1.2*e);this.mesh.position.add(c),this.tryPlayWalkAnimation(),this.rotateTowards(l,e)}else this.fetchedItems.length+1,`${this.maxCarryCapacity}`,s.userData,this.fetchedItems.push({userData:{itemId:s.userData.itemId,quantity:s.userData.quantity||1}}),this.fetchTargets.shift(),this.removeItemFromGround(s),this.createItemInMouth(s.userData.itemId),(this.fetchedItems.length>=this.maxCarryCapacity||this.fetchTargets.length===0)&&(`${this.fetchedItems.length}`,this.returnToPlayer=!0),this.tryPlayIdleAnimation(),this.bark()}else if(this.returnToPlayer)if(n.distanceTo(t)>1.8){const r=new T().subVectors(t,n).normalize(),a=new T(r.x*this.speed*e,0,r.z*this.speed*e);this.mesh.position.add(a),this.tryPlayWalkAnimation(),this.rotateTowards(r,e)}else`${this.fetchedItems.length}`,this.deliverMultipleItems()&&(this.state="following",this.fetchedItems=[],this.returnToPlayer=!1,this.removeItemFromMouth(),this.tryPlayIdleAnimation(),this.bark())}updateIdle(e,t,n,i){this.tryPlayIdleAnimation(),i>this.followDistance*1.5?this.state="following":Math.random()<.05&&this.wanderCooldown<=0&&this.startWandering()}startWandering(){this.state="wandering",this.wanderCooldown=Math.random()*10+5}setRandomWanderTarget(e){const t=Math.random()*Math.PI*2,n=Math.random()*this.wanderRadius*.5+1;this.wanderTarget=new T(e.x+Math.cos(t)*n,e.y,e.z+Math.sin(t)*n)}startFetching(e){this.state="fetching",this.fetchTargets=[e],this.returnToPlayer=!1,e.userData?.itemId}addFetchTarget(e){!this.isAlreadyTargeted(e)&&this.fetchTargets.length<this.maxCarryCapacity&&(this.fetchTargets.push(e),e.userData?.itemId,this.fetchTargets.length)}isAlreadyTargeted(e){return this.fetchTargets.includes(e)}findNextFetchTarget(e,t){for(const i of e)if(t.distanceTo(i.position)<=200&&!this.isAlreadyTargeted(i)&&this.hasItemBeenDroppedLongEnough(i))return i;return null}hasItemBeenDroppedLongEnough(e){if(!e.userData||!e.userData.dropTime)return`${e.userData?.itemId}`,!0;const t=Date.now(),n=e.userData.dropTime,i=t-n,s=1e4,r=i>=s;if(r)`${e.userData.itemId}${Math.floor(i/1e3)}`;else{const a=Math.ceil((s-i)/1e3);`${e.userData.itemId}${a}`}return r}findNearestDroppedItem(e,t){let n=null,i=1/0;for(const s of e){const r=t.distanceTo(s.position);r<i&&(n=s,i=r)}return n}itemExists(e,t){return t.includes(e)}validateItemExists(e,t){if(!e)return!1;const n=t.includes(e),i=this.scene.children.includes(e),r=window.gameInstance?.pickupableItems?.includes(e)||!1,a=n&&i;return a||(`${e.userData?.itemId}`,e.userData),a}deliverMultipleItems(){if(this.fetchedItems.length,this.fetchedItems.length===0)return!1;const e=window.gameInstance;if(!e?.inventory||!e?.itemRegistry)return!1;let t=[],n=0;for(let i=0;i<this.fetchedItems.length;i++){const s=this.fetchedItems[i],r=s.userData.itemId,a=s.userData.quantity||1,l=e.itemRegistry[r];if(!l){console.warn(`❌ Item ${r} not found in registry, skipping`);continue}i+1,`${this.fetchedItems.length}${l.name}${a}`;const c=e.inventory.addItem(l,a);c>0?(t.push({item:l,quantity:c}),n+=c,`${c}${l.name}`,this.removeLatestItemFromMouth(),i<this.fetchedItems.length-1&&setTimeout(()=>{i+1,`${this.fetchedItems.length}`},i*100)):console.warn(`❌ Could not deliver ${l.name} - inventory may be full`)}return this.forceInventoryUIUpdate(),t.length>0?(this.showDeliveryPopup(t,n),e.inventory.onInventoryChange&&e.inventory.onInventoryChange(),setTimeout(()=>{if(e.player&&e.inventory){const i=e.inventory.getSelectedItem();e.player.updateHeldItem(i)}},100),`${n}`,!0):!1}forceDeliveryDirectly(){if(!this.fetchTarget?.userData?.itemId)return!1;const e=window.gameInstance;if(!e?.inventory)return!1;const t=this.fetchTarget.userData.itemId,n=this.fetchTarget.userData.quantity||1,i=e.itemRegistry[t];if(!i)return!1;i.name;const s=class{constructor(l,c){this.item=l,this.quantity=c}},r=new s(i,n),a=e.inventory;for(let l=0;l<a.hotbar.length;l++)if(!a.hotbar[l])return a.hotbar[l]=r,e.inventoryUI&&(e.inventoryUI.updateHotbar(),e.inventoryUI.updateUI()),!0;for(let l=0;l<a.backpack.length;l++)if(!a.backpack[l])return a.backpack[l]=r,e.inventoryUI&&(e.inventoryUI.updateBackpack(),e.inventoryUI.updateUI()),!0;return!1}emergencyDelivery(){if(!this.fetchTarget?.userData?.itemId)return!1;const e=window.gameInstance;if(!e?.inventory)return!1;const t=this.fetchTarget.userData.itemId,n=this.fetchTarget.userData.quantity||1,i=e.itemRegistry[t];if(!i)return!1;i.name;try{const s=e.inventory.addItem(i,n);if(s>0)return e.inventoryUI&&(e.inventoryUI.updateUI(),e.inventoryUI.updateHotbar(),e.inventoryUI.updateBackpack()),e.inventory.onInventoryChange&&e.inventory.onInventoryChange(),!0}catch(s){console.error("Emergency delivery error:",s)}return!1}absoluteBruteForceDelivery(){if(!this.fetchTarget?.userData?.itemId)return!1;const e=window.gameInstance;if(!e?.inventory||!e?.itemRegistry)return!1;const t=this.fetchTarget.userData.itemId,n=this.fetchTarget.userData.quantity||1,i=e.itemRegistry[t];if(!i)return!1;i.name;const s=e.inventory;for(let r=0;r<s.hotbar.length;r++)if(!s.hotbar[r]){const a=window.ItemStack||e.inventory.constructor.ItemStack||class{constructor(c,h){this.item=c,this.quantity=h}},l=new a(i,n);return s.hotbar[r]=l,s.hotbar[r],s.onInventoryChange&&s.onInventoryChange(),s.notifyChange&&s.notifyChange(),e.inventoryUI&&(e.inventoryUI.updateUI&&e.inventoryUI.updateUI(),e.inventoryUI.updateHotbar&&e.inventoryUI.updateHotbar(),e.inventoryUI.createHotbar&&e.inventoryUI.createHotbar()),!0}for(let r=0;r<s.backpack.length;r++)if(!s.backpack[r]){const a=window.ItemStack||e.inventory.constructor.ItemStack||class{constructor(c,h){this.item=c,this.quantity=h}},l=new a(i,n);return s.backpack[r]=l,s.backpack[r],s.onInventoryChange&&s.onInventoryChange(),s.notifyChange&&s.notifyChange(),e.inventoryUI&&(e.inventoryUI.updateUI&&e.inventoryUI.updateUI(),e.inventoryUI.updateBackpack&&e.inventoryUI.updateBackpack()),!0}return!1}performNuclearUIUpdate(){const e=window.gameInstance;if(e){if(e.inventoryUI)try{e.inventoryUI.updateUI(),e.inventoryUI.updateHotbar(),e.inventoryUI.refresh&&e.inventoryUI.refresh()}catch(t){console.warn("💥 Cycle 1 error:",t)}for(let t=1;t<=5;t++)setTimeout(()=>{try{if(t+1,e.inventoryUI&&(e.inventoryUI.updateUI(),e.inventoryUI.updateHotbar()),e.inventory&&(e.inventory.onInventoryChange&&e.inventory.onInventoryChange(),e.inventory.notifyChange&&e.inventory.notifyChange()),e.player&&e.inventory){const n=e.inventory.getSelectedItem();e.player.updateHeldItem(n)}}catch(n){console.warn(`💥 Cycle ${t+1} error:`,n)}},t*100)}}showDeliveryPopup(e,t){if(!window.gameInstance?.inventoryUI){console.warn("No inventory UI available for delivery popup");return}const i={};e.forEach(({item:r,quantity:a})=>{i[r.id]?i[r.id].quantity+=a:i[r.id]={item:r,quantity:a}});const s=Object.values(i);if(s.length===1){const{item:r,quantity:a}=s[0];this.showDogDeliveryPopup(r,a)}else this.showMultiItemDeliveryPopup(s,t)}showDogDeliveryPopup(e,t){const n=window.gameInstance;if(!n?.inventoryUI)return;const i=document.createElement("div");i.className="pickup-popup",i.style.background="linear-gradient(145deg, #90EE90, #98FB98)",i.style.borderColor="#32CD32";const s=n.inventoryUI.getItemIcon(e);i.innerHTML=`
      <div class="item-icon" style="background-color: ${s.color};">
        ${s.icon}
      </div>
      <div class="pickup-details">
        <div class="pickup-item-name">
          <span class="pickup-plus-sign">🐕</span>${e.name}
        </div>
        <div class="pickup-item-quantity">
          Dog delivered ${t>1?`${t} items`:"1 item"}
        </div>
      </div>
    `,document.body.appendChild(i),setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},3e3)}showMultiItemDeliveryPopup(e,t){const n=window.gameInstance;if(!n?.inventoryUI)return;const i=document.createElement("div");i.className="pickup-popup",i.style.background="linear-gradient(145deg, #90EE90, #98FB98)",i.style.borderColor="#32CD32",i.style.width="auto",i.style.minWidth="200px";let s="";const r=3;for(let a=0;a<Math.min(e.length,r);a++){const{item:l}=e[a],c=n.inventoryUI.getItemIcon(l);s+=`<div class="item-icon" style="background-color: ${c.color}; width: 32px; height: 32px; font-size: 16px; margin: 2px;">${c.icon}</div>`}e.length>r&&(s+=`<div style="color: #8B4513; font-size: 12px; font-weight: bold;">+${e.length-r} more</div>`),i.innerHTML=`
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2px;">
          ${s}
        </div>
      </div>
      <div class="pickup-details">
        <div class="pickup-item-name">
          <span class="pickup-plus-sign">🐕</span>Multiple Items
        </div>
        <div class="pickup-item-quantity">
          Dog delivered ${t} items
        </div>
      </div>
    `,document.body.appendChild(i),setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},3e3)}forceInventoryUIUpdate(){const e=window.gameInstance;if(e?.inventoryUI){try{e.inventoryUI.updateUI&&e.inventoryUI.updateUI(),e.inventoryUI.updateHotbar&&e.inventoryUI.updateHotbar(),e.inventoryUI.updateBackpack&&e.inventoryUI.updateBackpack(),e.inventoryUI.createHotbar&&e.inventoryUI.hotbarContainer&&(e.inventoryUI.hotbarContainer.innerHTML="",e.inventoryUI.createHotbar())}catch(t){console.warn("⚠️ Inventory UI update error:",t)}setTimeout(()=>{try{e.inventoryUI.updateUI&&e.inventoryUI.updateUI(),e.inventory.onInventoryChange&&e.inventory.onInventoryChange()}catch(t){console.warn("⚠️ Delayed inventory update error:",t)}},50)}}rotateTowards(e,t){if(e.length()>0){const n=Math.atan2(e.x,e.z),i=this.mesh.rotation.y;let s=n-i;for(;s>Math.PI;)s-=2*Math.PI;for(;s<-Math.PI;)s+=2*Math.PI;const r=Math.sign(s)*Math.min(Math.abs(s),this.rotationSpeed*t);this.mesh.rotation.y+=r}}bark(){const e=this.tryPlayBarkAnimation();setTimeout(()=>{this.restorePreviousAnimation()},e?1e3:100)}tryPlayIdleAnimation(){return this.playAnimation("idle")||this.playAnimation("Idle")}tryPlayWalkAnimation(){return this.playAnimation("walk")||this.playAnimation("Walk")||this.playAnimation("run")}tryPlayBarkAnimation(){return this.playAnimation("bark")||this.playAnimation("Bark")}restorePreviousAnimation(){this.state==="idle"?this.tryPlayIdleAnimation():(this.state==="following"||this.state==="wandering"||this.state==="fetching")&&(this.state==="fetching"||this.state==="following"&&this.player?.mesh&&this.mesh.position.distanceTo(this.player.mesh.position)>this.followDistance||this.state==="wandering"&&this.wanderTarget&&this.mesh.position.distanceTo(this.wanderTarget)>.5?this.tryPlayWalkAnimation():this.tryPlayIdleAnimation())}createMouthContainer(){this.mouthContainer=new Dt,this.mouthContainer.position.set(0,.2,.4),this.mouthContainer.rotation.set(0,0,0),this.mouthContainer.scale.set(.5,.5,.5),this.mesh.add(this.mouthContainer)}async createItemInMouth(e){if(!e||!this.mouthContainer)return;this.itemsInMouth.length;let t;switch(e){case"apple":const i=new qt(.12,8,6),s=new We({color:16729156});t=new Le(i,s);break;case"wood":const r=new ln(.08,.08,.25,6),a=new We({color:9127187});t=new Le(r,a),t.rotation.z=Math.PI/2;break;case"stone":const l=new ns(.06),c=new We({color:6710886});t=new Le(l,c);break;default:const h=new je(.12,.12,.12),d=new We({color:5025616});t=new Le(h,d);break}t.castShadow=!0,t.receiveShadow=!1;const n=this.itemsInMouth.length;this.positionItemInMouth(t,n),this.mouthContainer.add(t),this.itemsInMouth.push(t),t.rotation.x+=(Math.random()-.5)*.3,t.rotation.y+=(Math.random()-.5)*.3,t.rotation.z+=(Math.random()-.5)*.3,n+1,`${this.itemsInMouth.length}`}positionItemInMouth(e,t){const r=t*.08,a=t*.05,l=t%2*.05-.025;e.position.set(0+l,-.08+r,.15+a);const h=1-Math.min(t*.1,.3);e.scale.setScalar(h),t+1,e.position}removeItemFromMouth(){if(this.itemsInMouth.length>0&&this.mouthContainer){`${this.itemsInMouth.length}`;for(const e of this.itemsInMouth)this.mouthContainer.remove(e),e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose();this.itemsInMouth=[]}}removeLatestItemFromMouth(){if(this.itemsInMouth.length>0&&this.mouthContainer){const e=this.itemsInMouth.pop();this.mouthContainer.remove(e),e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose(),`${this.itemsInMouth.length}`,this.repositionRemainingItems()}}repositionRemainingItems(){for(let e=0;e<this.itemsInMouth.length;e++)this.positionItemInMouth(this.itemsInMouth[e],e)}removeItemFromGround(e){const t=e||this.fetchTarget;if(t){if(window.gameInstance&&window.gameInstance.inventoryUI&&t.userData.itemId&&window.gameInstance.inventoryUI.cleanupWorldPickupPrompts(t.userData.itemId),this.scene.remove(t),window.gameInstance&&window.gameInstance.pickupableItems){const n=window.gameInstance.pickupableItems.indexOf(t);n!==-1&&(window.gameInstance.pickupableItems.splice(n,1),t.userData.itemId)}if(window.gameInstance&&window.gameInstance.itemDropSystem){const n=window.gameInstance.itemDropSystem.droppedItems.indexOf(t);n!==-1&&window.gameInstance.itemDropSystem.droppedItems.splice(n,1)}}}destroy(){this.removeItemFromMouth(),this.mesh&&this.scene.remove(this.mesh),this.mixer&&this.mixer.stopAllAction()}}class Rv{constructor(e){this.gameInstance=e,this.menuElement=null,this.backgroundScene=null,this.backgroundCamera=null,this.backgroundRenderer=null,this.animationId=null,this.isVisible=!0,this.createMainMenu(),this.setupBackground(),this.startBackgroundAnimation()}createMainMenu(){this.menuElement=document.createElement("div"),this.menuElement.className="main-menu",this.menuElement.id="main-menu",this.menuElement.innerHTML=`
      <div class="menu-background"></div>
      <div class="menu-content">
        <div class="game-title">
          <h1>Cozy Adventure</h1>
          <p class="subtitle">Explore • Build • Survive</p>
        </div>
        
        <div class="menu-buttons">
          <button class="menu-btn primary" id="start-game">
            <span class="btn-icon">🏠</span>
            <span class="btn-text">Start Adventure</span>
          </button>
          
          <button class="menu-btn" id="continue-game" style="display: none;">
            <span class="btn-icon">📖</span>
            <span class="btn-text">Continue</span>
          </button>
          
          <button class="menu-btn" id="load-game">
            <span class="btn-icon">💾</span>
            <span class="btn-text">Load Game</span>
          </button>
          
          <button class="menu-btn" id="save-game" style="display: none;">
            <span class="btn-icon">💿</span>
            <span class="btn-text">Save Game</span>
          </button>
        </div>
        
        <!-- Save/Load Modal -->
        <div id="save-load-modal" class="save-load-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h2 id="modal-title">Load Game</h2>
              <button class="close-btn" id="close-modal">&times;</button>
            </div>
            <div class="modal-body">
              <div class="save-slots" id="save-slots">
                <!-- Save slots will be populated dynamically -->
              </div>
            </div>
            <div class="modal-footer">
              <button class="menu-btn" id="modal-cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `,this.createStyles(),this.setupEventListeners(),document.body.appendChild(this.menuElement)}createStyles(){const e=document.createElement("style");e.textContent=`
      @import url('/assets/external/fonts.googleapis.com/css2__qs_family_Fredoka_One_wght_400_family_Nunito_wght_400_600_700_display_swap.css');
      
      .main-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        font-family: 'Nunito', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      
      .menu-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(139, 69, 19, 0.9) 0%,
          rgba(160, 82, 45, 0.85) 25%,
          rgba(210, 180, 140, 0.8) 50%,
          rgba(245, 222, 179, 0.85) 75%,
          rgba(139, 69, 19, 0.9) 100%
        );
        backdrop-filter: blur(10px);
        animation: backgroundShift 20s ease-in-out infinite;
      }
      
      @keyframes backgroundShift {
        0%, 100% { opacity: 0.9; }
        50% { opacity: 0.7; }
      }
      
      .menu-content {
        position: relative;
        z-index: 2;
        text-align: center;
        max-width: 500px;
        width: 90%;
        padding: 40px;
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.95), rgba(222, 184, 135, 0.9));
        border: 4px solid #8B4513;
        border-radius: 30px;
        box-shadow: 
          0 20px 60px rgba(139, 69, 19, 0.6),
          inset 0 4px 8px rgba(255, 255, 255, 0.3),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
        animation: menuFloat 6s ease-in-out infinite;
      }
      
      @keyframes menuFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      .game-title h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 3.5rem;
        color: #8B4513;
        margin: 0 0 10px 0;
        text-shadow: 
          3px 3px 0px rgba(160, 82, 45, 0.8),
          6px 6px 20px rgba(139, 69, 19, 0.4);
        background: linear-gradient(45deg, #8B4513, #CD853F, #D2691E);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: titleGlow 3s ease-in-out infinite alternate;
      }
      
      @keyframes titleGlow {
        from { filter: drop-shadow(0 0 5px rgba(139, 69, 19, 0.3)); }
        to { filter: drop-shadow(0 0 15px rgba(139, 69, 19, 0.6)); }
      }
      
      .subtitle {
        font-size: 1.2rem;
        color: #A0522D;
        margin: 0 0 30px 0;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      
      .menu-buttons {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
      }
      
      .menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 16px 24px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 3px solid #CD853F;
        border-radius: 20px;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          0 6px 20px rgba(139, 69, 19, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.6),
          inset 0 -2px 4px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
      }
      
      .menu-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
      }
      
      .menu-btn:hover::before {
        left: 100%;
      }
      
      .menu-btn:hover {
        transform: translateY(-3px) scale(1.02);
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        box-shadow: 
          0 8px 25px rgba(139, 69, 19, 0.4),
          inset 0 2px 6px rgba(255, 255, 255, 0.7),
          inset 0 -3px 6px rgba(0, 0, 0, 0.1);
      }
      
      .menu-btn:active {
        transform: translateY(-1px) scale(0.98);
      }
      
      .menu-btn.primary {
        background: linear-gradient(145deg, #98FB98, #90EE90);
        border-color: #32CD32;
        color: #2E8B57;
        box-shadow: 
          0 8px 25px rgba(50, 205, 50, 0.4),
          inset 0 2px 6px rgba(255, 255, 255, 0.8),
          inset 0 -3px 6px rgba(0, 0, 0, 0.1);
      }
      
      .menu-btn.primary:hover {
        background: linear-gradient(145deg, #ADFF2F, #98FB98);
        border-color: #228B22;
        box-shadow: 
          0 10px 30px rgba(50, 205, 50, 0.6),
          inset 0 2px 8px rgba(255, 255, 255, 0.9),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .btn-icon {
        font-size: 1.4rem;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
      }
      
      .btn-text {
        font-weight: 700;
        letter-spacing: 0.5px;
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .menu-content {
          width: 95%;
          padding: 30px 20px;
          max-width: none;
        }
        
        .game-title h1 {
          font-size: 2.5rem;
        }
        
        .subtitle {
          font-size: 1rem;
          margin-bottom: 25px;
        }
        
        .menu-btn {
          padding: 14px 20px;
          font-size: 1rem;
          gap: 10px;
        }
        
        .btn-icon {
          font-size: 1.2rem;
        }
      }
      
      @media (max-width: 480px) {
        .menu-content {
          padding: 25px 15px;
        }
        
        .game-title h1 {
          font-size: 2rem;
        }
        
        .menu-buttons {
          gap: 12px;
        }
        
        .menu-btn {
          padding: 12px 16px;
          font-size: 0.95rem;
        }
      }
      
      /* Save/Load Modal Styles */
      .save-load-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .modal-content {
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.98), rgba(222, 184, 135, 0.95));
        border: 4px solid #8B4513;
        border-radius: 20px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(139, 69, 19, 0.8);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        border-bottom: 2px solid rgba(139, 69, 19, 0.3);
      }
      
      .modal-header h2 {
        font-family: 'Fredoka One', cursive;
        color: #8B4513;
        margin: 0;
        font-size: 1.8rem;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        color: #8B4513;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }
      
      .close-btn:hover {
        background-color: rgba(139, 69, 19, 0.1);
      }
      
      .modal-body {
        padding: 30px;
      }
      
      .save-slots {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .save-slot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 2px solid #CD853F;
        border-radius: 15px;
        transition: all 0.2s ease;
        cursor: pointer;
      }
      
      .save-slot:hover {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
      }
      
      .save-slot.empty {
        opacity: 0.6;
        font-style: italic;
      }
      
      .slot-info {
        flex: 1;
      }
      
      .slot-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 5px;
      }
      
      .slot-number {
        font-weight: bold;
        color: #8B4513;
        font-size: 1.1rem;
      }
      
      .slot-timestamp {
        color: #A0522D;
        font-size: 0.9rem;
      }
      
      .slot-details {
        font-size: 0.85rem;
        color: #8B4513;
      }
      
      .slot-actions {
        display: flex;
        gap: 10px;
      }
      
      .slot-btn {
        padding: 8px 15px;
        border: 2px solid #CD853F;
        border-radius: 10px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;
      }
      
      .slot-btn:hover {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        transform: translateY(-1px);
      }
      
      .slot-btn.delete {
        background: linear-gradient(145deg, #FFB6C1, #FF69B4);
        border-color: #FF1493;
        color: #8B0000;
      }
      
      .slot-btn.delete:hover {
        background: linear-gradient(145deg, #FFC0CB, #FFB6C1);
      }
      
      .modal-footer {
        padding: 20px 30px;
        border-top: 2px solid rgba(139, 69, 19, 0.3);
        display: flex;
        justify-content: center;
      }
      
      @media (max-width: 768px) {
        .modal-content {
          width: 95%;
          margin: 20px;
        }
        
        .modal-header {
          padding: 15px 20px;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .save-slot {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }
        
        .slot-actions {
          align-self: stretch;
          justify-content: space-between;
        }
        
        .slot-btn {
          flex: 1;
          text-align: center;
        }
      }
    `,document.head.appendChild(e)}setupBackground(){this.backgroundScene=new Rr,this.backgroundCamera=new _t(75,window.innerWidth/window.innerHeight,.1,1e3),this.backgroundRenderer=new As({alpha:!0,antialias:!0}),this.backgroundRenderer.setSize(window.innerWidth,window.innerHeight),this.backgroundRenderer.setClearColor(8900331,.3),this.menuElement.querySelector(".menu-background").appendChild(this.backgroundRenderer.domElement),this.backgroundRenderer.domElement.style.position="absolute",this.backgroundRenderer.domElement.style.top="0",this.backgroundRenderer.domElement.style.left="0",this.backgroundRenderer.domElement.style.zIndex="-1";const t=new Rs(16777215,.6);this.backgroundScene.add(t);const n=new xi(16777215,.8);n.position.set(5,5,5),this.backgroundScene.add(n),this.createFloatingElements(),this.backgroundCamera.position.z=10}createFloatingElements(){const e=[new je(1,1,1),new qt(.5,16,12),new ra(.5,1,8)],t=[new We({color:9127187,transparent:!0,opacity:.3}),new We({color:14596231,transparent:!0,opacity:.4}),new We({color:16113331,transparent:!0,opacity:.3})];this.floatingElements=[];for(let n=0;n<20;n++){const i=e[Math.floor(Math.random()*e.length)],s=t[Math.floor(Math.random()*t.length)],r=new Le(i,s);r.position.set((Math.random()-.5)*30,(Math.random()-.5)*20,(Math.random()-.5)*20),r.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const a=.5+Math.random()*1.5;r.scale.setScalar(a),r.userData={rotationSpeed:{x:(Math.random()-.5)*.02,y:(Math.random()-.5)*.02,z:(Math.random()-.5)*.02},floatSpeed:.001+Math.random()*.002,floatOffset:Math.random()*Math.PI*2},this.backgroundScene.add(r),this.floatingElements.push(r)}}setupEventListeners(){this.menuElement.querySelector("#start-game").addEventListener("click",()=>{this.startGame()}),this.menuElement.querySelector("#continue-game").addEventListener("click",()=>{this.continueGame()}),this.menuElement.querySelector("#load-game").addEventListener("click",()=>{this.showLoadModal()}),this.menuElement.querySelector("#save-game").addEventListener("click",()=>{this.showSaveModal()});const s=this.menuElement.querySelector("#save-load-modal"),r=this.menuElement.querySelector("#close-modal"),a=this.menuElement.querySelector("#modal-cancel");r.addEventListener("click",()=>{this.hideModal()}),a.addEventListener("click",()=>{this.hideModal()}),s.addEventListener("click",l=>{l.target===s&&this.hideModal()}),window.addEventListener("resize",()=>{this.backgroundRenderer&&this.backgroundCamera&&(this.backgroundCamera.aspect=window.innerWidth/window.innerHeight,this.backgroundCamera.updateProjectionMatrix(),this.backgroundRenderer.setSize(window.innerWidth,window.innerHeight))})}startBackgroundAnimation(){const e=()=>{this.isVisible&&(this.animationId=requestAnimationFrame(e),this.floatingElements.forEach((t,n)=>{t.rotation.x+=t.userData.rotationSpeed.x,t.rotation.y+=t.userData.rotationSpeed.y,t.rotation.z+=t.userData.rotationSpeed.z,t.position.y+=Math.sin(Date.now()*t.userData.floatSpeed+t.userData.floatOffset)*.01}),this.backgroundRenderer.render(this.backgroundScene,this.backgroundCamera))};e()}startGame(){this.hide(),this.gameInstance&&typeof this.gameInstance.startGame=="function"&&this.gameInstance.startGame()}updateMenuState(){const t=this.gameInstance.getSaveSlots().some(s=>s.exists),n=this.menuElement.querySelector("#continue-game");t?n.style.display="flex":n.style.display="none";const i=this.menuElement.querySelector("#save-game");this.gameInstance.isGameStarted?i.style.display="flex":i.style.display="none"}continueGame(){const e=this.gameInstance.getSaveSlots();let t=null,n=0;for(const i of e)i.exists&&i.metadata&&i.metadata.timestamp>n&&(t=i.slotNumber,n=i.metadata.timestamp);t!==null&&this.loadGame(t)}showLoadModal(){this.currentModalType="load";const e=this.menuElement.querySelector("#save-load-modal"),t=this.menuElement.querySelector("#modal-title");t.textContent="Load Game",this.populateSaveSlots(),e.style.display="flex"}showSaveModal(){this.currentModalType="save";const e=this.menuElement.querySelector("#save-load-modal"),t=this.menuElement.querySelector("#modal-title");t.textContent="Save Game",this.populateSaveSlots(),e.style.display="flex"}hideModal(){const e=this.menuElement.querySelector("#save-load-modal");e.style.display="none"}populateSaveSlots(){const e=this.menuElement.querySelector("#save-slots"),t=this.gameInstance.getSaveSlots();e.innerHTML="",t.forEach(n=>{const i=document.createElement("div");if(i.className=`save-slot ${n.exists?"":"empty"}`,n.exists&&n.metadata){const s=new Date(n.metadata.timestamp),r=this.formatPlayTime(n.metadata.playTime||0);i.innerHTML=`
          <div class="slot-info">
            <div class="slot-header">
              <span class="slot-number">Slot ${n.slotNumber+1}</span>
              <span class="slot-timestamp">${s.toLocaleDateString()} ${s.toLocaleTimeString()}</span>
            </div>
            <div class="slot-details">
              Play Time: ${r} • Location: ${n.metadata.location||"Unknown"}
            </div>
          </div>
          <div class="slot-actions">
            <button class="slot-btn load-btn" data-slot="${n.slotNumber}">
              ${this.currentModalType==="save"?"Overwrite":"Load"}
            </button>
            <button class="slot-btn delete" data-slot="${n.slotNumber}">Delete</button>
          </div>
        `}else i.innerHTML=`
          <div class="slot-info">
            <div class="slot-header">
              <span class="slot-number">Slot ${n.slotNumber+1}</span>
            </div>
            <div class="slot-details">Empty Slot</div>
          </div>
          <div class="slot-actions">
            <button class="slot-btn load-btn" data-slot="${n.slotNumber}" ${this.currentModalType==="load"?"disabled":""}>
              ${this.currentModalType==="save"?"Save Here":"Empty"}
            </button>
          </div>
        `;e.appendChild(i)}),this.setupSlotEventListeners()}setupSlotEventListeners(){const e=this.menuElement.querySelectorAll(".load-btn"),t=this.menuElement.querySelectorAll(".delete");e.forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const s=parseInt(n.dataset.slot);this.currentModalType==="save"?this.saveGame(s):this.loadGame(s)})}),t.forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const s=parseInt(n.dataset.slot);this.deleteSave(s)})})}async saveGame(e){if(!this.gameInstance.isGameStarted){alert("You must start a game before you can save!");return}try{if(this.gameInstance.saveGame(e))e+1,this.hideModal(),this.updateMenuState(),this.showMessage(`Game saved to Slot ${e+1}!`,"success");else throw new Error("Save operation failed")}catch(t){console.error("Failed to save game:",t),this.showMessage("Failed to save game. Please try again.","error")}}async loadGame(e){try{if(await this.gameInstance.loadGame(e))e+1,this.hideModal(),this.updateMenuState(),this.showMessage(`Game loaded from Slot ${e+1}!`,"success");else throw new Error("Load operation failed")}catch(t){console.error("Failed to load game:",t),this.showMessage("Failed to load game. The save file may be corrupted.","error")}}deleteSave(e){if(confirm(`Are you sure you want to delete Slot ${e+1}? This action cannot be undone.`))try{if(this.gameInstance.deleteSave(e))e+1,this.populateSaveSlots(),this.updateMenuState(),this.showMessage(`Slot ${e+1} deleted.`,"info");else throw new Error("Delete operation failed")}catch(t){console.error("Failed to delete save:",t),this.showMessage("Failed to delete save file.","error")}}formatPlayTime(e){const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h ${n%60}m`:n>0?`${n}m`:`${t}s`}showMessage(e,t="info"){const n=document.createElement("div");n.className=`menu-message ${t}`,n.textContent=e,n.style.cssText=`
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${t==="success"?"#4CAF50":t==="error"?"#f44336":"#2196F3"};
      color: white;
      border-radius: 10px;
      font-family: 'Nunito', sans-serif;
      font-weight: 600;
      z-index: 10002;
      animation: slideIn 0.3s ease;
    `,document.body.appendChild(n),setTimeout(()=>{n.style.animation="slideOut 0.3s ease",setTimeout(()=>{n.remove()},300)},3e3)}show(){this.menuElement&&(this.menuElement.style.display="flex",this.isVisible=!0,this.startBackgroundAnimation(),this.updateMenuState())}hide(){this.menuElement&&(this.menuElement.style.display="none",this.isVisible=!1,this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null))}destroy(){this.animationId&&cancelAnimationFrame(this.animationId),this.backgroundRenderer&&this.backgroundRenderer.dispose(),this.menuElement&&this.menuElement.remove()}}class Pv{constructor(e){this.gameInstance=e,this.saveSlots=1,this.currentSaveSlot=0,this.maxCookieSize=3500,this.saveCategories={PLAYER:"player",INVENTORY:"inventory",ENVIRONMENT:"environment",BUILDINGS:"buildings",WORLD_STATE:"worldState"}}saveGame(e=this.currentSaveSlot){try{`${e}`;const t=this.collectGameData(),n=JSON.stringify(t);`${n.length}`;const i=encodeURIComponent(n).length;return`${i}`,i>this.maxCookieSize?this.saveDataInChunks(e,n):this.setCookie(`cozyAdventure_save_${e}`,n,30),this.saveMetadata(e),`${e}`,!0}catch(t){return console.error("Failed to save game:",t),!1}}collectGameData(){const e={version:"1.0.0",timestamp:Date.now(),categories:{}};return this.gameInstance.player&&this.gameInstance.player.mesh&&(e.categories[this.saveCategories.PLAYER]={position:{x:this.gameInstance.player.mesh.position.x,y:this.gameInstance.player.mesh.position.y,z:this.gameInstance.player.mesh.position.z},rotation:{x:this.gameInstance.player.mesh.rotation.x,y:this.gameInstance.player.mesh.rotation.y,z:this.gameInstance.player.mesh.rotation.z},health:{current:this.gameInstance.healthSystem?.currentHealth||5,max:this.gameInstance.healthSystem?.maxHealth||5}}),this.gameInstance.inventory&&(e.categories[this.saveCategories.INVENTORY]=this.serializeInventory()),this.gameInstance.environment&&(e.categories[this.saveCategories.ENVIRONMENT]={trees:this.serializeTrees(),rocks:this.serializeRocks(),pickupableItems:this.serializePickupableItems(),droppedItems:this.serializeDroppedItems()}),this.gameInstance.buildingSystem&&(e.categories[this.saveCategories.BUILDINGS]={structures:this.serializeBuildings()}),e.categories[this.saveCategories.WORLD_STATE]={dayTime:Date.now()%864e5,weather:"clear",gameTime:Date.now()-(this.gameInstance.gameStartTime||Date.now())},e}serializeInventory(){const e=this.gameInstance.inventory,t={};if(!e)return console.warn("Inventory not found during serialization"),{backpack:{},hotbar:{}};if(e.backpack&&Array.isArray(e.backpack))for(let i=0;i<e.backpack.length;i++){const s=e.backpack[i];s&&s.item&&(t[i]={itemId:s.item.id,quantity:s.quantity})}const n={};if(e.hotbar&&Array.isArray(e.hotbar))for(let i=0;i<e.hotbar.length;i++){const s=e.hotbar[i];s&&s.item&&(n[i]={itemId:s.item.id,quantity:s.quantity})}return{backpack:t,hotbar:n,selectedSlot:e.selectedHotbarSlot}}serializeTrees(){const e=[];return this.gameInstance.environment&&this.gameInstance.environment.trees&&this.gameInstance.environment.trees.forEach((t,n)=>{t&&t.position&&e.push({id:n,position:{x:t.position.x,y:t.position.y,z:t.position.z},rotation:{x:t.rotation.x,y:t.rotation.y,z:t.rotation.z},scale:{x:t.scale.x,y:t.scale.y,z:t.scale.z},type:t.userData?.treeType||"generic",health:t.userData?.health||100,isChopped:t.userData?.isChopped||!1})}),e}serializeRocks(){const e=[];return this.gameInstance.environment&&this.gameInstance.environment.rocks&&this.gameInstance.environment.rocks.forEach((t,n)=>{t&&t.position&&e.push({id:n,position:{x:t.position.x,y:t.position.y,z:t.position.z},rotation:{x:t.rotation.x,y:t.rotation.y,z:t.rotation.z},scale:{x:t.scale.x,y:t.scale.y,z:t.scale.z},type:t.userData?.rockType||"generic"})}),e}serializePickupableItems(){const e=[];return this.gameInstance.pickupableItems&&this.gameInstance.pickupableItems.forEach((t,n)=>{t&&t.position&&t.userData&&!t.userData.isRemoved?t.parent&&this.gameInstance.scene.children.includes(t)?e.push({id:n,itemId:t.userData.itemId,quantity:t.userData.quantity||1,position:{x:t.position.x,y:t.position.y,z:t.position.z},rotation:{x:t.rotation.x,y:t.rotation.y,z:t.rotation.z}}):`${t.userData.itemId}`:t&&t.userData&&t.userData.isRemoved&&`${t.userData.itemId}`}),`${e.length}`,e}serializeDroppedItems(){const e=[];return this.gameInstance.itemDropSystem&&this.gameInstance.itemDropSystem.droppedItems&&this.gameInstance.itemDropSystem.droppedItems.forEach((t,n)=>{t&&t.position&&t.userData&&!t.userData.isRemoved?t.parent&&this.gameInstance.scene.children.includes(t)?e.push({id:n,itemId:t.userData.itemId,quantity:t.userData.quantity||1,position:{x:t.position.x,y:t.position.y,z:t.position.z},rotation:{x:t.rotation.x,y:t.rotation.y,z:t.rotation.z},userData:{bobOffset:t.userData.bobOffset,initialY:t.userData.initialY,dropTime:t.userData.dropTime,isPhysicsItem:t.userData.isPhysicsItem,hasLanded:t.userData.hasLanded,groundY:t.userData.groundY}}):`${t.userData.itemId}`:t&&t.userData&&t.userData.isRemoved&&`${t.userData.itemId}`}),`${e.length}`,e}serializeBuildings(){if(!this.gameInstance.buildingSystem)return[];const e=this.gameInstance.levelManager;if(this.gameInstance.buildingSystem.saveManager&&this.gameInstance.buildingSystem.saveManager.getAllBuiltObjectsForSaving){const n=this.gameInstance.buildingSystem.saveManager.getAllBuiltObjectsForSaving();return`${n.length}`,n.forEach((i,s)=>{e&&typeof i.position.y=="number"?(i.level=this.calculateBuildingLevel(i.position.y,e),`${s}${i.type}${i.level}${i.position.y.toFixed(1)}`):(i.level=0,`${s}${i.type}${i.position.x.toFixed(1)}${i.position.y.toFixed(1)}${i.position.z.toFixed(1)}`)}),`${n.length}`,n}const t=[];return this.gameInstance.buildingSystem.builtWalls&&(`${this.gameInstance.buildingSystem.builtWalls.length}`,this.gameInstance.buildingSystem.builtWalls.forEach((n,i)=>{if(n&&n.position){const s={id:i,type:n.userData?.buildingType||n.userData?.type||"wall",subType:n.userData?.subType||null,position:{x:n.position.x,y:n.position.y,z:n.position.z},rotation:{x:n.rotation.x,y:n.rotation.y,z:n.rotation.z},scale:{x:n.scale.x,y:n.scale.y,z:n.scale.z},material:n.material?.name||"default",uuid:n.uuid||null,visible:n.visible!==!1,level:e?this.calculateBuildingLevel(n.position.y,e):0};n.userData&&(s.userData={...n.userData}),t.push(s),`${i}${s.type}${s.level}${s.position.y.toFixed(1)}`}})),`${t.length}`,t}saveDataInChunks(e,t){const n=Math.floor(this.maxCookieSize*.75),i=[];`${t.length}${n}`;for(let r=0;r<t.length;r+=n)i.push(t.slice(r,r+n));`${i.length}`;let s=0;i.forEach((r,a)=>{const l=`cozyAdventure_save_${e}_chunk_${a}`,c=encodeURIComponent(r).length;c>this.maxCookieSize?(console.error(`Chunk ${a} is still too large: ${c} bytes`),this.setLocalStorage(l,r,30)):this.setCookie(l,r,30),s++}),this.setCookie(`cozyAdventure_save_${e}_chunks`,i.length.toString(),30),`${s}${e}`}saveMetadata(e){const t={slotNumber:e,timestamp:Date.now(),playerLevel:1,playTime:Date.now()-(this.gameInstance.gameStartTime||Date.now()),location:"Starting Area",version:"1.0.0"};this.setCookie(`cozyAdventure_meta_${e}`,JSON.stringify(t),30)}async loadGame(e=this.currentSaveSlot){try{`${e}`;const t=this.loadGameData(e);return t?(this.gameInstance.isGameStarted||(await this.gameInstance.startGame(),await new Promise(n=>setTimeout(n,1e3))),await this.restoreGameData(t),`${e}`,!0):(`${e}`,!1)}catch(t){return console.error("Failed to load game:",t),!1}}loadGameData(e){try{const t=this.getCookie(`cozyAdventure_save_${e}_chunks`);let n="";if(t){`${t}`;for(let i=0;i<parseInt(t);i++){const s=this.getCookie(`cozyAdventure_save_${e}_chunk_${i}`);if(s)n+=s;else throw new Error(`Missing chunk ${i} for save slot ${e}`)}}else{const i=this.getCookie(`cozyAdventure_save_${e}`);if(!i)return null;n=i}if(!n||typeof n!="string")throw new Error("Save data is empty or not a string");(n.includes("e+")||n.includes("E+"))&&(console.warn("Detected potential scientific notation in save data, attempting to fix..."),n=this.fixScientificNotation(n));try{return JSON.parse(n)}catch(i){console.error("JSON parse error details:",{error:i.message,dataLength:n.length,dataPreview:n.substring(0,100),errorPosition:i.message.match(/at line \d+ column (\d+)/)?.[1]});const s=this.attemptJSONFix(n);if(s!==n)return JSON.parse(s);throw i}}catch(t){return console.error(`Failed to load save data from slot ${e}:`,t),this.deleteSave(e),null}}async restoreGameData(e){if(!e.categories){console.error("No save categories found in save data");return}Object.keys(e.categories),e.categories[this.saveCategories.PLAYER]?this.restorePlayerData(e.categories[this.saveCategories.PLAYER]):console.warn("No player data found in save"),e.categories[this.saveCategories.INVENTORY]?await this.restoreInventoryData(e.categories[this.saveCategories.INVENTORY]):console.warn("No inventory data found in save"),e.categories[this.saveCategories.ENVIRONMENT]?await this.restoreEnvironmentData(e.categories[this.saveCategories.ENVIRONMENT]):console.warn("No environment data found in save"),e.categories[this.saveCategories.BUILDINGS]?await this.restoreBuildingData(e.categories[this.saveCategories.BUILDINGS]):console.warn("No building data found in save")}restorePlayerData(e){this.gameInstance.player&&this.gameInstance.player.mesh&&e.position&&(this.gameInstance.player.mesh.position.set(e.position.x,e.position.y,e.position.z),e.rotation&&this.gameInstance.player.mesh.rotation.set(e.rotation.x,e.rotation.y,e.rotation.z),e.health&&this.gameInstance.healthSystem&&(typeof e.health.max=="number"&&(this.gameInstance.healthSystem.maxHealth=e.health.max),typeof e.health.current=="number"&&(this.gameInstance.healthSystem.currentHealth=e.health.current,this.gameInstance.healthSystem.updateHeartsDisplay()),`${e.health.current}${e.health.max}`))}async restoreInventoryData(e){if(!this.gameInstance.inventory||!e){console.warn("Inventory or inventory data not found during restore");return}const t=this.gameInstance.inventory;if(t.hotbar&&Array.isArray(t.hotbar)&&t.hotbar.fill(null),t.backpack&&Array.isArray(t.backpack)&&t.backpack.fill(null),e.backpack)for(const[n,i]of Object.entries(e.backpack)){if(!this.gameInstance.itemRegistry){console.error("ItemRegistry not found during backpack restore");continue}const s=this.gameInstance.itemRegistry[i.itemId];if(s)try{const r=parseInt(n);r>=0&&r<t.backpack.length&&(t.backpack[r]=new ui(s,i.quantity),`${i.quantity}${s.name}${r}`)}catch(r){console.error(`Failed to restore item to backpack slot ${n}:`,r)}else console.warn(`Item ${i.itemId} not found in itemRegistry during backpack restore`)}if(e.hotbar)for(const[n,i]of Object.entries(e.hotbar)){if(!this.gameInstance.itemRegistry){console.error("ItemRegistry not found during hotbar restore");continue}const s=this.gameInstance.itemRegistry[i.itemId];if(s)try{const r=parseInt(n);r>=0&&r<t.hotbar.length&&(t.hotbar[r]=new ui(s,i.quantity),`${i.quantity}${s.name}${r}`)}catch(r){console.error(`Failed to restore item to hotbar slot ${n}:`,r)}else console.warn(`Item ${i.itemId} not found in itemRegistry during hotbar restore`)}if(typeof e.selectedSlot=="number")try{t.selectedHotbarSlot=e.selectedSlot,`${e.selectedSlot}`}catch(n){console.error("Failed to restore selected hotbar slot:",n)}t.notifyChange&&t.notifyChange()}async restoreEnvironmentData(e){e.pickupableItems&&e.pickupableItems.forEach(t=>{this.restorePickupableItem(t)}),e.droppedItems&&(`${e.droppedItems.length}`,e.droppedItems.forEach(t=>{this.restoreDroppedItem(t)}))}restorePickupableItem(e){if(!this.gameInstance.itemDropSystem||!e.itemId){console.warn("ItemDropSystem or itemId missing during item restore");return}if(!this.gameInstance.itemRegistry){console.error("ItemRegistry not found during pickupable item restore");return}const t=this.gameInstance.itemRegistry[e.itemId];if(t&&e.position)try{const n=this.gameInstance.itemDropSystem.createItemMesh(t,e.quantity||1);n&&n.position?(n.position.set(e.position.x,e.position.y,e.position.z),e.rotation&&n.rotation&&n.rotation.set(e.rotation.x,e.rotation.y,e.rotation.z),this.gameInstance.scene.add(n),this.gameInstance.pickupableItems.push(n),`${t.name}`):console.warn(`Failed to create item mesh for ${t.name} or mesh has no position property`)}catch(n){console.error(`Error restoring pickupable item ${e.itemId}:`,n)}else console.warn(`Item ${e.itemId} not found in itemRegistry or missing position data`)}async restoreDroppedItem(e){if(!this.gameInstance.itemDropSystem||!e.itemId){console.warn("ItemDropSystem or itemId missing during dropped item restore");return}if(!this.gameInstance.itemRegistry){console.error("ItemRegistry not found during dropped item restore");return}const t=this.gameInstance.itemRegistry[e.itemId];if(t&&e.position)try{const n=await this.gameInstance.itemDropSystem.createItemMesh(t);n&&n.position?(n.position.set(e.position.x,e.position.y,e.position.z),e.rotation&&n.rotation&&n.rotation.set(e.rotation.x,e.rotation.y,e.rotation.z),n.userData={itemId:e.itemId,quantity:e.quantity||1,bobOffset:e.userData?.bobOffset||Math.random()*Math.PI*2,initialY:e.userData?.initialY||e.position.y,dropTime:e.userData?.dropTime||Date.now(),isPhysicsItem:e.userData?.isPhysicsItem||!1,hasLanded:e.userData?.hasLanded||!0,groundY:e.userData?.groundY||6.3},this.gameInstance.scene.add(n),this.gameInstance.itemDropSystem.droppedItems.push(n),this.gameInstance.pickupableItems&&this.gameInstance.pickupableItems.push(n),`${t.name}${e.position.x.toFixed(1)}${e.position.y.toFixed(1)}${e.position.z.toFixed(1)}`):console.warn(`Failed to create item mesh for ${t.name} or mesh has no position property`)}catch(n){console.error(`Error restoring dropped item ${e.itemId}:`,n)}else console.warn(`Item ${e.itemId} not found in itemRegistry or missing position data`)}async restoreBuildingData(e){if(!this.gameInstance.buildingSystem||!e.structures){console.warn("Building system or building data not found during restore");return}this.gameInstance.buildingSystem,`${e.structures.length}`,await this.clearAllExistingBuildings();for(const t of e.structures)try{await this.restoreBuilding(t)}catch(n){console.error(`Failed to restore building ${t.type||t.id}:`,n)}}async clearAllExistingBuildings(){const e=this.gameInstance.buildingSystem;e.builtWalls&&Array.isArray(e.builtWalls)&&(e.builtWalls.forEach(t=>{t&&t.parent&&t.parent.remove(t),this.gameInstance.collisionSystem&&this.gameInstance.collisionSystem.removeCollider(t)}),e.builtWalls.length=0),e.objectsRegistry&&e.objectsRegistry.clearAllBuiltObjects&&e.objectsRegistry.clearAllBuiltObjects(),e.occupiedCells&&e.occupiedCells.clear(),e.cellToWallMap&&e.cellToWallMap.clear()}async restoreBuilding(e){const t=this.gameInstance.buildingSystem,n=e.type,i=e.level||0;if(`${n}${i}`,!t?.objectsRegistry){console.error("BuildableObjectsRegistry not found during building restore");return}const s=t.objectsRegistry;let r=null;if(s.buildableObjects&&s.buildableObjects[n]&&(r=s.buildableObjects[n]),!r){console.warn(`Building type ${n} not found in registry. Available types:`,Object.keys(s.buildableObjects||{}));return}let a=null;try{if(t.saveManager&&typeof t.saveManager.createBuildingMesh=="function")a=t.saveManager.createBuildingMesh(n,e.position,e.rotation||0);else{console.error("Save manager not found or createBuildingMesh method missing");return}}catch(l){console.error(`Error creating building mesh for ${n}:`,l);return}if(!a){console.error(`Failed to create building mesh for type: ${n}`);return}a.position.set(e.position.x,e.position.y,e.position.z),e.rotation&&(typeof e.rotation=="object"?a.rotation.set(e.rotation.x||0,e.rotation.y||0,e.rotation.z||0):a.rotation.y=e.rotation),e.scale&&a.scale.set(e.scale.x||1,e.scale.y||1,e.scale.z||1),a.visible=e.visible!==!1,a.userData={buildingType:n,type:n,isCollider:!0,colliderType:"mesh",isBuildingWall:!0,isBreakable:!0,...e.userData},e.uuid&&(a.uuid=e.uuid),a.traverse(l=>{l.isMesh&&(l.userData={...l.userData,isCollider:!0,colliderType:"mesh",isBuildingWall:!0,isBreakable:!0,buildingType:n,type:n},l.geometry&&(l.geometry.computeBoundingBox(),l.geometry.computeBoundingSphere()),l.updateMatrixWorld(!0))}),this.gameInstance.scene.add(a),this.registerRestoredBuilding(a,n,e),`${n}${e.level||0}${e.position.x.toFixed(1)}${e.position.y.toFixed(1)}${e.position.z.toFixed(1)}`}registerRestoredBuilding(e,t,n){const i=this.gameInstance.buildingSystem;i.builtWalls&&i.builtWalls.push(e),i.objectsRegistry&&i.objectsRegistry.registerBuiltObject&&i.objectsRegistry.registerBuiltObject(t,e),this.gameInstance.collisionSystem&&(this.gameInstance.collisionSystem.addCollider&&this.gameInstance.collisionSystem.addCollider(e,"mesh"),this.gameInstance.collisionSystem.addBuilding&&this.gameInstance.collisionSystem.addBuilding(e));const s=this.gameInstance.levelManager,r=n.level||0;if(s){const a=s.currentLevel;s.currentLevel=r;const l=this.getOccupiedCellsForBuilding(n,i);l.forEach(c=>{s.addOccupiedCell(c),s.getCurrentLevelCellToWallMap().set(c,e)}),s.currentLevel=a,`${l.length}${r}`}else this.getOccupiedCellsForBuilding(n,i).forEach(l=>{i.occupiedCells&&i.occupiedCells.add(l),i.cellToWallMap&&i.cellToWallMap.set(l,e)})}getOccupiedCellsForBuilding(e,t){const n=new THREE.Vector3(e.position.x,e.position.y,e.position.z),i=this.gameInstance.buildingSystem.objectsRegistry;let s=null;i&&i.buildableObjects&&(s=i.buildableObjects[e.type]);const r=s?s.cellSize:1,a=t.gridSize||2,l=Math.round((n.x+.001)/a),c=Math.round((n.z+.001)/a),h=[];let d,u;typeof r=="object"&&r.width&&r.height?(d=r.width,u=r.height):(d=r,u=1);let p=0;e.rotation&&(typeof e.rotation=="object"?p=e.rotation.y||0:typeof e.rotation=="number"&&(p=e.rotation));const y=(Math.round(p*180/Math.PI/90)*90%360+360)%360;return this.calculateRotatedCellsForRestore(l,c,d,u,y,h),h}calculateRotatedCellsForRestore(e,t,n,i,s,r){const a=Math.floor(n/2),l=Math.floor(i/2),c=[];for(let h=-a;h<n-a;h++)for(let d=-l;d<i-l;d++)c.push({x:h,z:d});c.forEach(h=>{let d,u;switch(s){case 0:d=h.x,u=h.z;break;case 90:d=-h.z,u=h.x;break;case 180:d=-h.x,u=-h.z;break;case 270:d=h.z,u=-h.x;break;default:d=h.x,u=h.z}const p=e+d,g=t+u,y=`${p},${g}`;r.push(y)})}calculateBuildingLevel(e,t){if(!t||!t.levelHeight)return 0;const n=6,i=t.levelHeight,s=Math.round((e-n)/i),r=t.minLevel||0,a=(t.maxLevels||10)-1;return Math.max(r,Math.min(a,s))}getSaveSlots(){const e=[];for(let t=0;t<this.saveSlots;t++){const n=this.getSaveMetadata(t);e.push({slotNumber:t,exists:n!==null,metadata:n})}return e}getSaveMetadata(e){const t=this.getCookie(`cozyAdventure_meta_${e}`);return t?JSON.parse(t):null}deleteSave(e){try{this.deleteCookie(`cozyAdventure_save_${e}`);const t=this.getCookie(`cozyAdventure_save_${e}_chunks`);if(t){for(let n=0;n<parseInt(t);n++)this.deleteCookie(`cozyAdventure_save_${e}_chunk_${n}`);this.deleteCookie(`cozyAdventure_save_${e}_chunks`)}return this.deleteCookie(`cozyAdventure_meta_${e}`),`${e}`,!0}catch(t){return console.error("Failed to delete save:",t),!1}}setCookie(e,t,n){try{const i=new Date;i.setTime(i.getTime()+n*24*60*60*1e3);const s=window.location.protocol==="https:",r=s?"None":"Lax",a=s?";Secure":"",l=s?";Partitioned":"",c=encodeURIComponent(t),h=`${e}=${c};expires=${i.toUTCString()};path=/;SameSite=${r}${a}${l}`;if(h.length>4096)throw new Error(`Cookie too large: ${h.length} bytes (max 4096)`);document.cookie=h;const d=this.getCookieOnly(e);if(!d||d!==t)throw new Error("Cookie verification failed - value mismatch")}catch(i){console.warn(`Cookie failed for ${e}, falling back to localStorage:`,i.message),this.setLocalStorage(e,t,n)}}getCookieOnly(e){const t=e+"=",n=document.cookie.split(";");for(let i=0;i<n.length;i++){let s=n[i];for(;s.charAt(0)===" ";)s=s.substring(1,s.length);if(s.indexOf(t)===0)return decodeURIComponent(s.substring(t.length,s.length))}return null}getCookie(e){const t=this.getCookieOnly(e);return t!==null?t:this.getLocalStorage(e)}deleteCookie(e){try{const t=window.location.protocol==="https:",n=t?"None":"Lax",i=t?";Secure":"",s=t?";Partitioned":"";document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=${n}${i}${s}`}catch(t){console.warn(`Cookie deletion failed for ${e}:`,t.message)}this.deleteLocalStorage(e)}setLocalStorage(e,t,n){try{const i=Date.now()+n*24*60*60*1e3,s={value:t,expires:i};localStorage.setItem(e,JSON.stringify(s)),`${e}`}catch(i){console.error(`Failed to save to localStorage: ${e}`,i)}}getLocalStorage(e){try{const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return n.expires&&Date.now()>n.expires?(localStorage.removeItem(e),null):n.value}catch(t){return console.error(`Failed to read from localStorage: ${e}`,t),null}}deleteLocalStorage(e){try{localStorage.removeItem(e),`${e}`}catch(t){console.error(`Failed to remove from localStorage: ${e}`,t)}}enableAutoSave(e=5){this.autoSaveInterval&&clearInterval(this.autoSaveInterval),this.autoSaveInterval=setInterval(()=>{this.gameInstance.isGameStarted&&this.saveGame(this.currentSaveSlot)},e*60*1e3),`${e}`}disableAutoSave(){this.autoSaveInterval&&(clearInterval(this.autoSaveInterval),this.autoSaveInterval=null)}fixScientificNotation(e){return e.replace(/(\d+\.?\d*)e\+?(-?\d+)/gi,(t,n,i)=>(parseFloat(n)*Math.pow(10,parseInt(i))).toString())}attemptJSONFix(e){let t=e;return t=t.replace(/,\s*([}\]])/g,"$1"),t=t.replace(/e\+?\s*([,}\]])/g,"0$1"),t=t.replace(/:\s*NaN/g,": 0"),t=t.replace(/:\s*Infinity/g,": 999999"),t=t.replace(/:\s*-Infinity/g,": -999999"),t}destroy(){this.disableAutoSave()}}class Lv{constructor(e){this.gameInstance=e,this.saveNotification=null,this.isVisible=!1,this.createInGameUI()}createInGameUI(){this.saveButton=document.createElement("button"),this.saveButton.id="in-game-save-btn",this.saveButton.className="in-game-save-button",this.saveButton.innerHTML=`
      <span class="save-icon">💾</span>
      <span class="save-text">Quick Save</span>
    `,this.createStyles(),this.setupEventListeners(),document.body.appendChild(this.saveButton)}createStyles(){const e=document.createElement("style");e.textContent=`
      .in-game-save-button {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.95), rgba(222, 184, 135, 0.9));
        border: 2px solid #CD853F;
        border-radius: 12px;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
        backdrop-filter: blur(8px);
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
      }

      .in-game-save-button.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }

      .in-game-save-button:hover {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 6px 18px rgba(139, 69, 19, 0.4);
      }

      .in-game-save-button:active {
        transform: translateY(0) scale(0.98);
      }

      .in-game-save-button.saving {
        background: linear-gradient(145deg, #98FB98, #90EE90);
        border-color: #32CD32;
        color: #2E8B57;
        animation: savePulse 0.6s ease;
      }

      @keyframes savePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      .save-icon {
        font-size: 1.1rem;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
      }

      .save-text {
        font-weight: 700;
        letter-spacing: 0.3px;
      }

      .save-notification {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1001;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        pointer-events: none;
        backdrop-filter: blur(8px);
      }

      .save-notification.show {
        opacity: 1;
        transform: translateX(0);
      }

      .save-notification.success {
        background: rgba(76, 175, 80, 0.95);
        color: white;
        border: 2px solid #4CAF50;
      }

      .save-notification.error {
        background: rgba(244, 67, 54, 0.95);
        color: white;
        border: 2px solid #f44336;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .in-game-save-button {
          top: 15px;
          right: 15px;
          padding: 10px 14px;
          font-size: 0.85rem;
          gap: 6px;
        }

        .save-icon {
          font-size: 1rem;
        }

        .save-notification {
          top: 70px;
          right: 15px;
          font-size: 0.85rem;
          padding: 10px 14px;
        }
      }

      @media (max-width: 480px) {
        .in-game-save-button {
          top: 10px;
          right: 10px;
          padding: 8px 12px;
          font-size: 0.8rem;
        }

        .save-text {
          display: none;
        }

        .save-notification {
          top: 60px;
          right: 10px;
          font-size: 0.8rem;
          padding: 8px 12px;
          max-width: calc(100vw - 20px);
          word-wrap: break-word;
        }
      }

      /* Animation for button appearance */
      @keyframes slideInFromTop {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .in-game-save-button.appearing {
        animation: slideInFromTop 0.4s ease;
      }
    `,document.head.appendChild(e)}setupEventListeners(){this.saveButton.addEventListener("click",async()=>{await this.showQuickSaveModal()}),document.addEventListener("keydown",e=>{e.ctrlKey&&e.key==="s"&&(e.preventDefault(),this.performQuickSave())})}async showQuickSaveModal(){if(!this.gameInstance.isGameStarted){this.showNotification("Cannot save - game not started!","error");return}const e=document.createElement("div");e.className="quick-save-modal",e.innerHTML=`
      <div class="quick-save-content">
        <div class="quick-save-header">
          <h3>Quick Save</h3>
          <button class="quick-save-close">&times;</button>
        </div>
        <div class="quick-save-body">
          <p>Choose a save slot:</p>
          <div class="quick-save-slots" id="quick-save-slots">
            <!-- Slots will be populated here -->
          </div>
        </div>
      </div>
    `;const t=`
      .quick-save-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s ease;
      }

      .quick-save-content {
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.98), rgba(222, 184, 135, 0.95));
        border: 3px solid #8B4513;
        border-radius: 15px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(139, 69, 19, 0.6);
      }

      .quick-save-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 2px solid rgba(139, 69, 19, 0.3);
      }

      .quick-save-header h3 {
        margin: 0;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
      }

      .quick-save-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #8B4513;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }

      .quick-save-close:hover {
        background-color: rgba(139, 69, 19, 0.1);
      }

      .quick-save-body {
        padding: 20px;
      }

      .quick-save-body p {
        margin: 0 0 15px 0;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
      }

      .quick-save-slots {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .quick-save-slot-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 15px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 2px solid #CD853F;
        border-radius: 10px;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .quick-save-slot-btn:hover {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        transform: translateY(-1px);
      }

      .quick-save-slot-btn.empty {
        opacity: 0.7;
        font-style: italic;
      }

      .slot-info {
        text-align: left;
      }

      .slot-name {
        font-weight: 700;
        margin-bottom: 2px;
      }

      .slot-details {
        font-size: 0.8rem;
        opacity: 0.8;
      }

      @media (max-width: 480px) {
        .quick-save-content {
          width: 95%;
          margin: 20px;
        }

        .quick-save-header {
          padding: 12px 15px;
        }

        .quick-save-body {
          padding: 15px;
        }

        .quick-save-slot-btn {
          padding: 10px 12px;
        }
      }
    `;if(!document.querySelector("#quick-save-modal-styles")){const a=document.createElement("style");a.id="quick-save-modal-styles",a.textContent=t,document.head.appendChild(a)}const n=this.gameInstance.getSaveSlots(),i=e.querySelector("#quick-save-slots"),s=n[0];if(s){const a=document.createElement("button");if(a.className=`quick-save-slot-btn ${s.exists?"":"empty"}`,s.exists&&s.metadata){const l=new Date(s.metadata.timestamp);a.innerHTML=`
          <div class="slot-info">
            <div class="slot-name">Save Game</div>
            <div class="slot-details">${l.toLocaleDateString()} ${l.toLocaleTimeString()}</div>
          </div>
          <span>Overwrite</span>
        `}else a.innerHTML=`
          <div class="slot-info">
            <div class="slot-name">Save Game</div>
            <div class="slot-details">No save file</div>
          </div>
          <span>Save</span>
        `;a.addEventListener("click",async()=>{e.remove(),await this.performQuickSave(s.slotNumber)}),i?.appendChild(a)}e.querySelector(".quick-save-close")?.addEventListener("click",()=>{e.remove()}),e.addEventListener("click",a=>{a.target===e&&e.remove()}),document.body.appendChild(e)}async performQuickSave(e=0){if(!this.gameInstance.isGameStarted){this.showNotification("Cannot save - game not started!","error");return}this.saveButton.classList.add("saving"),this.saveButton.innerHTML=`
      <span class="save-icon">⏳</span>
      <span class="save-text">Saving...</span>
    `;try{if(await this.gameInstance.saveGame(e))this.showNotification(`Game saved to Slot ${e+1}!`,"success"),this.saveButton.innerHTML=`
          <span class="save-icon">✅</span>
          <span class="save-text">Saved!</span>
        `,setTimeout(()=>{this.saveButton.classList.remove("saving"),this.saveButton.innerHTML=`
            <span class="save-icon">💾</span>
            <span class="save-text">Quick Save</span>
          `},1500);else throw new Error("Save operation failed")}catch(t){console.error("Quick save failed:",t),this.showNotification("Save failed! Please try again.","error"),this.saveButton.classList.remove("saving"),this.saveButton.innerHTML=`
        <span class="save-icon">💾</span>
        <span class="save-text">Quick Save</span>
      `}}showNotification(e,t="success"){this.saveNotification&&this.saveNotification.remove(),this.saveNotification=document.createElement("div"),this.saveNotification.className=`save-notification ${t}`,this.saveNotification.textContent=e,document.body.appendChild(this.saveNotification),setTimeout(()=>{this.saveNotification&&this.saveNotification.classList.add("show")},50),setTimeout(()=>{this.saveNotification&&(this.saveNotification.classList.remove("show"),setTimeout(()=>{this.saveNotification&&(this.saveNotification.remove(),this.saveNotification=null)},300))},3e3)}show(){this.isVisible||(this.isVisible=!0,this.saveButton.classList.add("visible","appearing"),setTimeout(()=>{this.saveButton.classList.remove("appearing")},400))}hide(){this.isVisible&&(this.isVisible=!1,this.saveButton.classList.remove("visible"))}destroy(){this.saveButton&&this.saveButton.remove(),this.saveNotification&&this.saveNotification.remove()}}class bh{constructor(){this.loadingElement=null,this.progressBar=null,this.currentProgress=0,this.targetProgress=0,this.isVisible=!1,this.createLoadingScreen()}createLoadingScreen(){const e=document.createElement("div");this.loadingElement=e,e.className="loading-screen",e.id="loading-screen",e.innerHTML=`
      <div class="loading-background"></div>
      <div class="loading-content">
        <div class="loading-logo">
          <h1>Cozy Adventure</h1>
          <div class="loading-spinner">🏠</div>
        </div>

        <div class="loading-progress">
          <div class="progress-bar-container">
            <div class="progress-bar" id="progress-bar"></div>
          </div>
          <div class="progress-text">
            <span id="progress-percentage">0%</span>
            <span id="loading-status">Initializing...</span>
          </div>
        </div>

        <div class="loading-tips">
          <p id="loading-tip">Welcome to your cozy adventure!</p>
        </div>
      </div>
    `,this.progressBar=e.querySelector("#progress-bar"),this.createStyles(),document.body.appendChild(e),this.show()}createStyles(){const e=document.createElement("style");e.textContent=`
      @import url('/assets/external/fonts.googleapis.com/css2__qs_family_Fredoka_One_wght_400_family_Nunito_wght_400_600_700_display_swap.css');

      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 20000;
        font-family: 'Nunito', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        opacity: 1;
        transition: opacity 0.5s ease;
      }

      .loading-screen.hidden {
        opacity: 0;
        pointer-events: none;
      }

      .loading-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(139, 69, 19, 0.95) 0%,
          rgba(160, 82, 45, 0.9) 25%,
          rgba(210, 180, 140, 0.85) 50%,
          rgba(245, 222, 179, 0.9) 75%,
          rgba(139, 69, 19, 0.95) 100%
        );
        animation: backgroundPulse 4s ease-in-out infinite;
      }

      @keyframes backgroundPulse {
        0%, 100% { opacity: 0.95; }
        50% { opacity: 0.8; }
      }

      .loading-content {
        position: relative;
        z-index: 2;
        text-align: center;
        max-width: 500px;
        width: 90%;
        padding: 40px;
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.98), rgba(222, 184, 135, 0.95));
        border: 4px solid #8B4513;
        border-radius: 30px;
        box-shadow:
          0 20px 60px rgba(139, 69, 19, 0.6),
          inset 0 4px 8px rgba(255, 255, 255, 0.3),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
        animation: contentFloat 3s ease-in-out infinite;
      }

      @keyframes contentFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }

      .loading-logo h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 3rem;
        color: #8B4513;
        margin: 0 0 20px 0;
        text-shadow:
          3px 3px 0px rgba(160, 82, 45, 0.8),
          6px 6px 20px rgba(139, 69, 19, 0.4);
        background: linear-gradient(45deg, #8B4513, #CD853F, #D2691E);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .loading-spinner {
        font-size: 3rem;
        margin: 20px 0;
        animation: bounce 1.5s ease-in-out infinite;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .loading-progress {
        margin: 30px 0;
      }

      .progress-bar-container {
        width: 100%;
        height: 12px;
        background: rgba(139, 69, 19, 0.3);
        border-radius: 6px;
        overflow: hidden;
        border: 2px solid #8B4513;
        margin-bottom: 15px;
      }

      .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #32CD32, #98FB98, #90EE90);
        border-radius: 4px;
        width: 0%;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(50, 205, 50, 0.5);
        animation: progressGlow 2s ease-in-out infinite;
      }

      @keyframes progressGlow {
        0%, 100% { box-shadow: 0 0 10px rgba(50, 205, 50, 0.3); }
        50% { box-shadow: 0 0 20px rgba(50, 205, 50, 0.7); }
      }

      .progress-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        color: #8B4513;
        font-weight: 600;
      }

      #progress-percentage {
        font-size: 1.2rem;
        font-weight: 700;
      }

      #loading-status {
        font-style: italic;
        opacity: 0.8;
      }

      .loading-tips {
        margin-top: 25px;
        padding: 15px;
        background: rgba(139, 69, 19, 0.1);
        border-radius: 15px;
        border: 1px solid rgba(139, 69, 19, 0.2);
      }

      #loading-tip {
        font-size: 0.95rem;
        color: #8B4513;
        margin: 0;
        line-height: 1.4;
        opacity: 0.9;
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .loading-content {
          width: 95%;
          padding: 30px 20px;
        }

        .loading-logo h1 {
          font-size: 2.5rem;
        }

        .loading-spinner {
          font-size: 2.5rem;
        }

        .progress-text {
          font-size: 0.9rem;
        }

        #progress-percentage {
          font-size: 1.1rem;
        }

        #loading-tip {
          font-size: 0.9rem;
        }
      }

      @media (max-width: 480px) {
        .loading-content {
          padding: 25px 15px;
        }

        .loading-logo h1 {
          font-size: 2rem;
        }

        .loading-spinner {
          font-size: 2rem;
        }

        .progress-bar-container {
          height: 10px;
        }

        .progress-text {
          font-size: 0.85rem;
        }

        #loading-tip {
          font-size: 0.85rem;
        }
      }
    `,document.head.appendChild(e)}setProgress(e,t=""){this.targetProgress=Math.max(0,Math.min(100,e)),t&&this.setStatus(t),this.animateProgress()}animateProgress(){const e=()=>{const t=this.targetProgress-this.currentProgress;if(Math.abs(t)>.1){this.currentProgress+=t*.1,this.progressBar&&(this.progressBar.style.width=`${this.currentProgress}%`);const n=document.getElementById("progress-percentage");n&&(n.textContent=`${Math.round(this.currentProgress)}%`),requestAnimationFrame(e)}else{this.currentProgress=this.targetProgress,this.progressBar&&(this.progressBar.style.width=`${this.currentProgress}%`);const n=document.getElementById("progress-percentage");n&&(n.textContent=`${Math.round(this.currentProgress)}%`)}};e()}setStatus(e){const t=document.getElementById("loading-status");t&&(t.textContent=e)}setTip(e){const t=document.getElementById("loading-tip");t&&(t.textContent=e)}show(){this.loadingElement&&(this.loadingElement.classList.remove("hidden"),this.isVisible=!0)}hide(){this.loadingElement&&(this.loadingElement.classList.add("hidden"),this.isVisible=!1,setTimeout(()=>{this.loadingElement&&this.loadingElement.parentNode&&this.loadingElement.remove()},500))}destroy(){this.loadingElement&&this.loadingElement.parentNode&&this.loadingElement.remove()}}class Dv{constructor(){this.scene=null,this.camera=null,this.renderer=null,this.player=null,this.characterController=null,this.environment=null,this.inventory=null,this.inventoryUI=null,this.collisionSystem=null,this.buildingSystem=null,this.debugUI=null,this.treeChoppingSystem=null,this.itemDropSystem=null,this.healthSystem=null,this.itemUseSystem=null,this.dogCompanion=null,this.pickupableItems=[],this.pickupPrompt=null,this.nearestPickupableItem=null,this.lastPromptPosition={x:0,y:0},this.targetPromptPosition={x:0,y:0},this.promptLerpSpeed=.15,this.promptUpdateFrameCount=0,this.clock=new B0,this.compass=new Sv,this.mainMenu=null,this.isGameStarted=!1,this.isPaused=!1,this.saveSystem=null,this.gameStartTime=Date.now(),this.inGameUI=null,this.loadingScreen=null,window.gameInstance=this}async init(){this.saveSystem=new Pv(this),this.inGameUI=new Lv(this),this.mainMenu=new Rv(this)}async startGame(){this.loadingScreen=new bh,this.loadingScreen.setProgress(0,"Starting game initialization..."),this.loadingScreen.setTip("Welcome to your cozy adventure!"),await new Promise(e=>setTimeout(e,500)),this.mainMenu&&this.mainMenu.hide(),this.isGameStarted=!0,this.loadingScreen.setProgress(10,"Setting up 3D scene..."),this.loadingScreen.setTip("Creating the game world..."),this.createScene(),this.createCamera(),this.createRenderer(),this.loadingScreen.setProgress(20,"Initializing collision system..."),this.loadingScreen.setTip("Setting up physics and collisions..."),this.collisionSystem=new vv(this.scene),this.loadingScreen.setProgress(30,"Creating environment..."),this.loadingScreen.setTip("Generating trees, rocks, and terrain..."),this.environment=new Fy(this.scene,this.collisionSystem),this.environment.create(),this.setupColliders(),this.loadingScreen.setProgress(40,"Loading player character..."),this.loadingScreen.setTip("Preparing your character and animations..."),this.player=new mv(this.scene),await this.player.load(),this.loadingScreen.setProgress(50,"Setting up controls..."),this.loadingScreen.setTip("Configuring movement and camera controls..."),this.initializeControllers(),this.loadingScreen.setProgress(60,"Loading inventory system..."),this.loadingScreen.setTip("Setting up your backpack and items..."),this.initializeInventory(),this.loadingScreen.setProgress(65,"Initializing health system..."),this.loadingScreen.setTip("Setting up health and status effects..."),this.initializeHealthSystem(),this.initializeItemUseSystem(),this.initializeItemDropSystem(),this.loadingScreen.setProgress(70,"Loading building system..."),this.loadingScreen.setTip("Preparing construction tools and materials..."),await this.initializeBuildingSystem(),this.loadingScreen.setProgress(75,"Setting up resource gathering..."),this.loadingScreen.setTip("Loading axes and tree chopping mechanics..."),this.initializeTreeChoppingSystem(),this.loadingScreen.setProgress(80,"Loading your companion..."),this.loadingScreen.setTip("Your loyal dog companion is getting ready..."),await this.initializeDogCompanion(),this.scene.children.length,this.pickupableItems.length,this.loadingScreen.setProgress(85,"Setting up user interface..."),this.loadingScreen.setTip("Creating menus and interaction prompts..."),this.createPickupPrompt(),this.compass.initialize(),this.debugUI=new wv(this),this.setupEventListeners(),this.loadingScreen.setProgress(95,"Finalizing setup..."),this.loadingScreen.setTip("Almost ready! Preparing final touches..."),this.saveSystem&&this.saveSystem.enableAutoSave(5),this.inGameUI&&this.inGameUI.show(),this.loadingScreen.setProgress(100,"Ready to play!"),this.loadingScreen.setTip("Welcome to your cozy adventure! Start exploring!"),setTimeout(()=>{this.loadingScreen&&(this.loadingScreen.hide(),this.loadingScreen=null)},1500)}createScene(){this.scene=new Rr,this.scene.background=new ce(8900331),this.scene.fog=new ia(8900331,50,200)}createCamera(){this.camera=new _t(75,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.set(0,5,10)}createRenderer(){this.renderer=new As({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=qo,this.renderer.outputColorSpace=tt,this.renderer.toneMapping=bc,this.renderer.toneMappingExposure=1.2;const e=document.getElementById("gameContainer");if(!e)throw new Error("Cannot start game: #gameContainer element not found in the DOM");e.appendChild(this.renderer.domElement)}initializeControllers(){this.characterController=new K0(this.player.mesh,this.camera,this.renderer),this.collisionSystem&&(this.characterController.setCollisionSystem(this.collisionSystem),this.collisionSystem.setPlayerMesh(this.player.mesh))}setupColliders(){this.scene.traverse(e=>{e.userData&&e.userData.isCollider&&(e.name,e.userData.colliderType,this.collisionSystem.addCollider(e))}),`${this.collisionSystem.colliders.length}`}initializeInventory(){this.inventory=new gv,this.inventoryUI=new yv(this.inventory,this.player),this.createSampleItems(),this.addSampleItemsToInventory(),this.inventory.onHotbarSelectionChange=(e,t)=>{this.player&&this.player.mesh&&this.player.updateHeldItem(t)},setTimeout(()=>{const e=this.inventory.getSelectedItem();this.player&&this.player.mesh&&this.player.updateHeldItem(e)},100)}createSampleItems(){this.itemRegistry={sword:new pn("sword","Iron Sword","weapon","sword_icon",1,"A sharp iron sword for combat"),potion:new pn("potion","Health Potion","consumable","potion_icon",10,"Restores 50 health points"),wood:new pn("wood","Wood Plank","material","wood_icon",64,"Basic building material"),pickaxe:new pn("pickaxe","Stone Pickaxe","tool","pickaxe_icon",1,"Used for mining stone and ores"),apple:new pn("apple","Apple","consumable","apple_icon",16,"A crisp red apple that restores hunger"),helmet:new pn("helmet","Iron Helmet","armor","helmet_icon",1,"Provides protection for your head"),stone:new pn("stone","Stone","material","stone_icon",64,"Common stone material"),bow:new pn("bow","Wooden Bow","weapon","bow_icon",1,"Ranged weapon that shoots arrows"),arrow:new pn("arrow","Arrow","weapon","arrow_icon",64,"Ammunition for bows"),cube:new pn("cube","Test Cube","material","cube_icon",32,"A simple cube for testing inventory features"),axe:new pn("axe","Wooden Axe","tool","axe_icon",1,"A sturdy wooden axe for chopping trees and wood")}}addSampleItemsToInventory(){this.inventory.addItem(this.itemRegistry.axe,1),this.inventory.selectHotbarSlot(0)}createPickupPrompt(){this.pickupPrompt=document.createElement("div"),this.pickupPrompt.id="pickup-prompt",this.pickupPrompt.className="world-pickup-prompt",this.pickupPrompt.style.cssText=`
      position: fixed;
      opacity: 0;
      transition: opacity 0.15s ease;
      white-space: nowrap;
      will-change: left, top, opacity;
    `,this.pickupPrompt.innerHTML='Press <span class="pickup-key">E</span> to pick up',document.body.appendChild(this.pickupPrompt)}setupEventListeners(){window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}),document.addEventListener("keydown",e=>{e.code==="KeyE"&&this.tryPickupItem()}),document.addEventListener("click",e=>{this.treeChoppingSystem&&this.treeChoppingSystem.handleClick(e)})}tryPickupItem(){if(!this.nearestPickupableItem||!this.player||!this.inventory)return;const e=this.player.mesh.position,t=this.nearestPickupableItem.position;if(e.distanceTo(t)<=2.5){const s=this.nearestPickupableItem.userData.itemId,r=this.itemRegistry[s],a=this.nearestPickupableItem.userData.quantity;if(r){const l=this.inventory.addItem(r,a);if(l>0){this.scene.remove(this.nearestPickupableItem);const c=this.pickupableItems.indexOf(this.nearestPickupableItem);c!==-1&&this.pickupableItems.splice(c,1),this.nearestPickupableItem=null,this.pickupPrompt&&(this.pickupPrompt.style.opacity="0"),`${l}${r.name}`}}}}updatePickupPrompt(){if(!this.player||!this.pickupPrompt||this.pickupableItems.length===0)return;const e=this.player.mesh.position,t=2.5;this.validatePickupableItems(),this.nearestPickupableItem&&!this.scene.children.includes(this.nearestPickupableItem)&&(`${this.nearestPickupableItem.userData?.itemId}`,this.nearestPickupableItem=null,this.pickupPrompt.style.opacity="0",this.inventoryUI&&this.inventoryUI.cleanupWorldPickupPrompts(this.nearestPickupableItem?.userData?.itemId||"unknown"));const n=[];let i=null,s=1/0;for(const r of this.pickupableItems){if(!this.scene.children.includes(r)){`${r.userData?.itemId}`;continue}const a=e.distanceTo(r.position);a<=t&&(n.push(r),a<s&&(i=r,s=a))}if(n.length>0&&this.inventoryUI&&this.inventoryUI.showPickupPromptsForNewItems(n),this.nearestPickupableItem=i,i){if(!this.scene.children.includes(i)){`${i.userData?.itemId}`,this.pickupPrompt.style.opacity="0",this.nearestPickupableItem=null;return}this.pickupPrompt.style.opacity="1";const r=i.userData.itemId,a=this.itemRegistry[r],l=a?a.name:"Item";this.pickupPrompt.innerHTML=`Press <span class="pickup-key">E</span> to pick up <span class="pickup-item-name">${l}</span>`;const c=new T(i.position.x,i.position.y+.4,i.position.z);c.project(this.camera);const h=(c.x*.5+.5)*window.innerWidth,d=(c.y*-.5+.5)*window.innerHeight;this.targetPromptPosition.x=h,this.targetPromptPosition.y=d,this.lastPromptPosition.x+=(this.targetPromptPosition.x-this.lastPromptPosition.x)*this.promptLerpSpeed,this.lastPromptPosition.y+=(this.targetPromptPosition.y-this.lastPromptPosition.y)*this.promptLerpSpeed,this.pickupPrompt.style.left=`${Math.round(this.lastPromptPosition.x)}px`,this.pickupPrompt.style.top=`${Math.round(this.lastPromptPosition.y)}px`}else this.pickupPrompt.style.opacity="0"}validatePickupableItems(){const e=this.pickupableItems.length;this.pickupableItems=this.pickupableItems.filter(t=>{const n=this.scene.children.includes(t);return n||`${t.userData?.itemId}`,n}),this.pickupableItems.length!==e&&`${e}${this.pickupableItems.length}`,this.nearestPickupableItem&&!this.scene.children.includes(this.nearestPickupableItem)&&(this.nearestPickupableItem=null,this.pickupPrompt&&(this.pickupPrompt.style.opacity="0"))}update(){if(!this.isGameStarted||this.isPaused)return;const e=Math.min(this.clock.getDelta(),.1);this.characterController&&(this.characterController.update(e),this.player&&this.player.update(e,this.characterController,this.camera.position),this.compass.update(this.camera),this.updatePickupPrompt(),this.itemDropSystem&&this.itemDropSystem.update(),this.treeChoppingSystem&&this.treeChoppingSystem.update(),this.collisionSystem&&this.collisionSystem.updatePlayerColliderVisualization(),this.dogCompanion&&this.dogCompanion.update(e,this.pickupableItems),this.debugUI&&(this.debugUI.updateOccupiedSlotsDebug(),this.debugUI.updateVisuals()))}render(){this.isGameStarted&&this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}pause(){!this.isGameStarted||this.isPaused||(this.isPaused=!0,this.clock.stop(),this.environment&&this.environment.pauseWaves&&this.environment.pauseWaves())}resume(){this.isPaused&&(this.isPaused=!1,this.clock.start(),this.environment&&this.environment.resumeWaves&&this.environment.resumeWaves())}destroy(){this.saveSystem&&this.saveSystem.destroy(),this.inGameUI&&this.inGameUI.destroy(),this.mainMenu&&this.mainMenu.destroy(),this.pickupPrompt&&this.pickupPrompt.remove(),this.inventoryUI&&this.inventoryUI.destroy(),this.characterController&&this.characterController.destroy(),this.buildingSystem&&this.buildingSystem.destroy(),this.dogCompanion&&this.dogCompanion.destroy(),this.debugUI&&this.debugUI.destroy()}async initializeBuildingSystem(){try{this.buildingSystem=new Mv(this.scene,this.camera,this.collisionSystem,this.inventory),await this.buildingSystem.init(),this.player&&this.buildingSystem.setPlayer(this.player),this.itemRegistry&&this.buildingSystem.setItemRegistry(this.itemRegistry),this.buildingSystem,setTimeout(()=>{this.buildingSystem.isBuilding,this.buildingSystem.gridHelper},1e3)}catch(e){console.error("Failed to initialize building system:",e)}}initializeItemDropSystem(){this.itemDropSystem=new Tv(this.scene)}initializeTreeChoppingSystem(){this.treeChoppingSystem=new Ev(this.scene,this.camera,this.inventory,this.itemRegistry,this.environment,this.itemDropSystem),this.player&&this.treeChoppingSystem.setPlayer(this.player)}initializeHealthSystem(){this.healthSystem=new Av}initializeItemUseSystem(){if(!this.inventory||!this.healthSystem){console.error("Cannot initialize item use system - inventory or health system missing");return}this.itemUseSystem=new Iv(this.inventory,this.healthSystem)}async initializeDogCompanion(){try{this.dogCompanion=new Cv(this.scene,this.player),await this.dogCompanion.load(),this.player&&this.player.mesh&&this.dogCompanion.mesh.position.set(this.player.mesh.position.x-2,this.player.mesh.position.y,this.player.mesh.position.z-2),this.dogCompanion.mesh&&(this.dogCompanion.mesh.visible=!0,this.dogCompanion.mesh.visible,this.dogCompanion.mesh.position,this.dogCompanion.mesh.scale,this.scene.children.length)}catch(e){console.error("Failed to initialize dog companion:",e),this.createFallbackDog()}}createFallbackDog(){const e=new je(.5,.3,.8),t=new Is({color:9127187}),n=new Le(e,t);n.position.set(this.player.mesh.position.x-2,this.player.mesh.position.y+.15,this.player.mesh.position.z-2),n.castShadow=!0,n.receiveShadow=!0,this.scene.add(n),n.position}saveGame(e=0){return this.saveSystem?this.saveSystem.saveGame(e):!1}async loadGame(e=0){return this.saveSystem?await this.saveSystem.loadGame(e):!1}getSaveSlots(){return this.saveSystem?this.saveSystem.getSaveSlots():[]}deleteSave(e){return this.saveSystem?this.saveSystem.deleteSave(e):!1}}let ft,Ht;async function xc(){try{let t=function(){Ht&&(Ht.update(),Ht.render()),requestAnimationFrame(t)};var o=t;ft=new bh,ft.setProgress(0,"Starting game initialization..."),ft.setTip("Welcome to your cozy adventure!");const e=document.getElementById("loading");e&&(e.style.display="none"),await new Promise(n=>setTimeout(n,300)),ft.setProgress(10,"Creating game instance..."),ft.setTip("Setting up the game world..."),Ht=new Dv,Ht.setLoadingScreen&&Ht.setLoadingScreen(ft),ft.setProgress(20,"Initializing game components..."),ft.setTip("Loading 3D models and textures..."),await Ht.init(),ft.setProgress(90,"Finalizing setup..."),ft.setTip("Almost ready! Get ready to explore!"),ft.setProgress(100,"Ready to play!"),ft.setTip("Your adventure awaits! Start exploring!"),setTimeout(()=>{ft&&(ft.hide(),ft=null)},1200),t()}catch(e){console.error("Failed to initialize game:",e),ft&&(ft.setStatus("Error occurred during initialization"),ft.setTip("Something went wrong. Please refresh the page and try again."),setTimeout(()=>{if(ft&&ft.loadingElement){const n=document.createElement("button");n.textContent="Retry",n.style.cssText=`
            margin-top: 20px;
            padding: 10px 20px;
            background: linear-gradient(145deg, #32CD32, #228B22);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Nunito', sans-serif;
            font-weight: 600;
            transition: all 0.2s ease;
          `,n.addEventListener("click",()=>{location.reload()}),n.addEventListener("mouseenter",()=>{n.style.background="linear-gradient(145deg, #228B22, #006400)",n.style.transform="translateY(-1px)"}),n.addEventListener("mouseleave",()=>{n.style.background="linear-gradient(145deg, #32CD32, #228B22)",n.style.transform="translateY(0)"});const i=ft.loadingElement.querySelector(".loading-content");i&&i.appendChild(n)}},1e3));const t=document.getElementById("loading");t&&!ft&&(t.innerHTML=`
        <div style="color: #ff6b6b; text-align: center; padding: 20px;">
          <strong>Failed to load game</strong><br>
          ${e.message}<br>
          <small>Check console for details</small><br>
          <button onclick="location.reload()" style="margin-top: 10px; padding: 8px 16px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Retry
          </button>
        </div>
      `)}}document.addEventListener("visibilitychange",()=>{Ht&&(document.hidden?Ht.pause&&Ht.pause():Ht.resume&&Ht.resume())});window.addEventListener("resize",()=>{Ht&&Ht.handleResize&&Ht.handleResize()});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xc):xc();
//# sourceMappingURL=index-2BTPTPjx.js.map
