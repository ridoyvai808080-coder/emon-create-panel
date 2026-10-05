const PASS1="##emon##", PASS2="@@toufik@@";
const $=x=>document.getElementById(x), unlock=x=>$(x).classList.remove("locked");

let videoOpened={1:false,2:false};
let videoReady={1:false,2:false};
let timers={};

function startVideoGate(n){
  videoOpened[n]=true;
  const btn=$("videoDone"+n), msg=$("videoMsg"+n);
  let left=15;
  btn.disabled=true;
  msg.textContent=`ভিডিওটি দেখে ${left} সেকেন্ড অপেক্ষা করুন...`;
  clearInterval(timers[n]);
  timers[n]=setInterval(()=>{
    left--;
    if(left>0) msg.textContent=`ভিডিওটি দেখে ${left} সেকেন্ড অপেক্ষা করুন...`;
    else {
      clearInterval(timers[n]);
      videoReady[n]=true;
      btn.disabled=false;
      msg.textContent="✓ এখন ‘ভিডিও দেখেছি’ চাপুন।";
    }
  },1000);
}

function completeVideo(n){
  if(!videoOpened[n] || !videoReady[n]) return;
  $("videoMsg"+n).textContent="✓ ভিডিও ধাপ সম্পূর্ণ হয়েছে।";
  if(n===1){
    unlock("s2");
    $("s2").scrollIntoView({behavior:"smooth",block:"center"});
  } else {
    unlock("s4");
    $("idb").disabled=false;
    $("s4").scrollIntoView({behavior:"smooth",block:"center"});
  }
}

$("videoLink1").addEventListener("click",()=>startVideoGate(1));
$("videoLink2").addEventListener("click",()=>startVideoGate(2));

function p1(){
  if($("p1").value===PASS1){
    $("m1").textContent="✓ Password ঠিক আছে। ভিডিও ১ দেখুন।";
    unlock("video1");
    $("video1").scrollIntoView({behavior:"smooth",block:"center"});
  }else $("m1").textContent="✕ Password সঠিক নয়।";
}

let fb=false,tk=false;
$("fb").onclick=()=>{fb=true;$("socialDone").disabled=!(fb&&tk)};
$("tk").onclick=()=>{tk=true;$("socialDone").disabled=!(fb&&tk)};
function socialDone(){if(fb&&tk){$("m2").textContent="✓ Social step completed.";unlock("s3");$("p2b").disabled=false}}

function p2(){
  if($("p2").value===PASS2){
    $("m3").textContent="✓ Password ঠিক আছে। ভিডিও ২ দেখুন।";
    unlock("video2");
    $("video2").scrollIntoView({behavior:"smooth",block:"center"});
  }else $("m3").textContent="✕ Password সঠিক নয়।";
}

function verify(){
  let v=$("idn").value.trim(),email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),phone=/^[0-9+()\-\s]{7,20}$/.test(v);
  if(email||phone){$("m4").textContent="✓ Verification complete.";unlock("dl")}
  else $("m4").textContent="একটি বৈধ Gmail অথবা phone number দিন।";
}
$("year").textContent=new Date().getFullYear();
