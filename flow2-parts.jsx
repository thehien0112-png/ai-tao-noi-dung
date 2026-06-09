const { useState } = React;

// ===== Sample generated content for one lesson =====
const LESSON = {
  title: 'Tôi là học sinh lớp 2',
  subject: 'Tiếng Việt', grade: 'Lớp 2', level: 'Dễ', voice: 'Nova (Nữ trẻ)',
  reading: [
    'Hôm nay là ngày tựu trường. Mới sáng sớm, mẹ đã gọi nhưng tôi đã vùng dậy và chuẩn bị xong mọi thứ thật nhanh. Tôi muốn đến trường sớm nhất lớp.',
    'Trên đường tới trường, ánh nắng tràn ngập sân trường. Tôi chào mẹ rồi chạy ào vào cùng các bạn đang ríu rít trò chuyện.',
    'Tôi thấy các em lớp 1 còn rụt rè níu tay bố mẹ. Nhìn các em, tôi bỗng cảm thấy mình đã lớn bổng lên. Tôi tự hào vì mình là học sinh lớp 2 rồi!',
  ],
  words: 86, duration: '2:14',
};

// các bản tạo lại khác nhau của bài đọc
const READING_VARIANTS = [
  [
    'Sáng nay, trời trong xanh và mát mẻ. Em thức dậy thật sớm vì hôm nay là ngày đầu tiên của năm học mới. Em háo hức đến mức chuẩn bị xong sách vở chỉ trong chốc lát.',
    'Mẹ dắt em tới trường. Cổng trường rộn ràng tiếng cười nói. Em vẫy tay chào mẹ rồi chạy vào sân, nơi các bạn đang tụ tập trò chuyện vui vẻ.',
    'Nhìn các em lớp 1 còn bỡ ngỡ, em thấy mình thật lớn. Em mỉm cười và thầm nhủ: "Mình đã là học sinh lớp 2 rồi!"',
  ],
  [
    'Ngày tựu trường đã đến. Em dậy từ tinh mơ, lòng rộn ràng khó tả. Chỉ một loáng, em đã gọn gàng trong bộ đồng phục mới tinh.',
    'Con đường tới trường hôm nay như ngắn hơn mọi ngày. Sân trường ngập nắng, các bạn ríu rít như đàn chim nhỏ. Em chào mẹ rồi hoà vào niềm vui ấy.',
    'Thấy các em lớp 1 nắm chặt tay bố mẹ, em chợt nhận ra mình đã trưởng thành hơn. Một năm học mới bắt đầu, và em tự hào vì đã là học sinh lớp 2.',
  ],
];
const VOICES = ['Nova (Nữ trẻ)', 'Mai (Nữ miền Bắc)', 'Minh (Nam miền Bắc)'];
const VOICE_LIST = [
  { name:'Nova (Nữ trẻ)',       desc:'Nữ · trẻ trung, rõ ràng',  region:'Trung tính' },
  { name:'Mai (Nữ miền Bắc)',   desc:'Nữ · ấm, truyền cảm',      region:'Miền Bắc' },
  { name:'Minh (Nam miền Bắc)', desc:'Nam · trầm, chắc chắn',    region:'Miền Bắc' },
  { name:'Lan (Nữ miền Nam)',   desc:'Nữ · nhẹ nhàng, thân thiện', region:'Miền Nam' },
  { name:'Tuấn (Nam miền Nam)', desc:'Nam · vui tươi, gần gũi',  region:'Miền Nam' },
];
const SPEEDS = ['Chậm', 'Vừa', 'Nhanh'];
const DURATIONS = ['2:14', '1:58', '2:30', '2:06'];

function nowStr(){
  const d = new Date();
  const p = n => ('0'+n).slice(-2);
  return `${p(d.getDate())}/${p(d.getMonth()+1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

// ===== Bảng lịch sử phiên bản (dùng chung) =====
function VersionBar({versions, activeIdx, onPick, renderPreview, kind}){
  const [open, setOpen] = useState(false);
  const active = versions[activeIdx];
  return (
    <div className="ver-wrap">
      <div className="ver-bar">
        <span className="ver-cur">
          <Icon name="layers" size={14}/>Phiên bản {active.n}{activeIdx===0?' (mới nhất)':''}
          <span className="ver-time">· {active.time}</span>
        </span>
        {versions.length>1 && (
          <button className={'ver-toggle'+(open?' on':'')} onClick={()=>setOpen(o=>!o)}>
            <Icon name="history" size={14}/>Lịch sử tạo ({versions.length})<Icon name="chevDown" size={14}/>
          </button>
        )}
      </div>
      {open && versions.length>1 && (
        <div className="ver-list">
          {versions.map((v,i)=>(
            <div className={'ver-item'+(i===activeIdx?' active':'')} key={v.n} onClick={()=>{onPick(i);}}>
              <span className="vi-dot">{i===activeIdx ? <Icon name="check" size={13} stroke={3}/> : v.n}</span>
              <div className="vi-main">
                <div className="vi-title">Phiên bản {v.n}{i===0?' · Mới nhất':''}<span className="vi-time">{v.time}</span></div>
                <div className="vi-prev">{renderPreview(v)}</div>
              </div>
              {i===activeIdx
                ? <span className="vi-using">Đang dùng</span>
                : <button className="vi-use" onClick={e=>{e.stopPropagation();onPick(i);}}>{kind==='restore'?'Khôi phục':'Dùng bản này'}</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Bài đọc (reading passage) =====
function ReadingBody(){
  const [versions, setVersions] = useState([{ n:1, time:nowStr(), text:LESSON.reading.join('\n\n') }]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(versions[0].text);
  const [vi, setVi] = useState(0); // con trỏ biến thể tạo lại

  const text = versions[activeIdx].text;
  const pick = i => { setActiveIdx(i); setEditing(false); };
  const regen = ()=>{
    const variant = READING_VARIANTS[vi % READING_VARIANTS.length].join('\n\n');
    setVi(vi+1);
    setVersions(vs => [{ n: vs[0].n+1, time: nowStr(), text: variant }, ...vs]);
    setActiveIdx(0); setEditing(false);
  };
  const startEdit = ()=>{ setDraft(text); setEditing(true); };
  const saveEdit = ()=>{ setVersions(vs => vs.map((v,i)=> i===activeIdx ? {...v, text:draft} : v)); setEditing(false); };

  return (
    <div>
      <p className="sec-sub">Bài đọc do AI tạo từ nội dung bài học. Mỗi lần tạo lại sẽ lưu thành một phiên bản — bạn xem lại hoặc khôi phục bất cứ lúc nào.</p>
      <VersionBar versions={versions} activeIdx={activeIdx} onPick={pick} kind="restore"
        renderPreview={v=>v.text.replace(/\n+/g,' ').slice(0,90)+'…'}/>
      {!editing ? (
        <div className="doc">
          <div className="doc-title">{LESSON.title}</div>
          <div className="doc-meta"><span>{LESSON.subject} · {LESSON.grade}</span><span>~{text.split(/\s+/).length} từ</span><span>Thời lượng đọc ~1 phút</span></div>
          <div className="doc-body">{text.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div>
        </div>
      ) : (
        <textarea className="doc-edit" value={draft} onChange={e=>setDraft(e.target.value)}/>
      )}
      <div className="acc-actions">
        <div style={{display:'flex',gap:10}}>
          {!editing
            ? <button className="btn" onClick={startEdit}><Icon name="edit" size={15}/>Sửa nội dung</button>
            : <button className="btn btn-primary" onClick={saveEdit}><Icon name="check" size={15} stroke={3}/>Xong</button>}
          <button className="btn" onClick={regen}><Icon name="refresh" size={15}/>Tạo lại</button>
        </div>
        <button className="btn btn-primary"><Icon name="save" size={15}/>Lưu bài đọc</button>
      </div>
    </div>
  );
}

// ===== Sách nói (audiobook) =====
function AudioBody(){
  const [versions, setVersions] = useState([{ n:1, time:nowStr(), voice:LESSON.voice, speed:'Vừa', duration:LESSON.duration }]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selVoice, setSelVoice] = useState(LESSON.voice);
  const [selSpeed, setSelSpeed] = useState('Vừa');
  const bars = React.useMemo(()=>Array.from({length:60},()=>6+Math.round(Math.random()*26)),[]);
  const prog = 0.32;
  const cur = versions[activeIdx];

  const pick = i => { setActiveIdx(i); setPlaying(false); };
  const openPicker = ()=>{ setSelVoice(cur.voice); setSelSpeed(cur.speed||'Vừa'); setPickerOpen(true); };
  const regen = ()=>{
    const duration = DURATIONS[versions.length % DURATIONS.length];
    setVersions(vs => [{ n: vs[0].n+1, time: nowStr(), voice:selVoice, speed:selSpeed, duration }, ...vs]);
    setActiveIdx(0); setPlaying(false); setPickerOpen(false);
  };

  return (
    <div>
      <p className="sec-sub">Bản thu âm thanh đọc bài, giọng <b>{cur.voice}</b>{cur.speed?<> · tốc độ {cur.speed}</>:''}. Mỗi lần tạo lại được lưu thành phiên bản riêng để so sánh và khôi phục.</p>
      <VersionBar versions={versions} activeIdx={activeIdx} onPick={pick} kind="restore"
        renderPreview={v=>`Giọng ${v.voice} · ${v.speed||'Vừa'} · ${v.duration}`}/>
      <div className="player">
        <button className="player-btn" onClick={()=>setPlaying(p=>!p)}>
          <Icon name={playing?'pause':'play'} size={20} fill/>
        </button>
        <div className="player-mid">
          <div className="wave">
            {bars.map((h,i)=><i key={i} className={i/bars.length<prog?'on':''} style={{height:h}}/>)}
          </div>
          <div className="player-time"><span>0:42</span><span>{cur.duration}</span></div>
        </div>
        <span className="voice-chip"><Icon name="volume" size={14}/>{cur.voice}</span>
      </div>
      <div className="transcript">
        <div className="tl">Lời thoại</div>
        {LESSON.reading.map((p,i)=><p key={i} style={{margin:'0 0 8px'}}>{p}</p>)}
      </div>
      <div className="acc-actions">
        <div style={{display:'flex',gap:10,position:'relative'}}>
          <button className={'btn'+(pickerOpen?' btn-active':'')} onClick={()=>pickerOpen?setPickerOpen(false):openPicker()}>
            <Icon name="volume" size={15}/>Đổi giọng / Tạo lại<Icon name="chevDown" size={14}/>
          </button>
          <button className="btn"><Icon name="download" size={15}/>Tải MP3</button>
          {pickerOpen && (
            <div className="voice-pop">
              <div className="vp-head">Chọn giọng đọc</div>
              <div className="vp-list">
                {VOICE_LIST.map(v=>(
                  <button key={v.name} className={'vp-item'+(selVoice===v.name?' on':'')} onClick={()=>setSelVoice(v.name)}>
                    <span className="vp-ic"><Icon name="mic" size={15}/></span>
                    <span className="vp-main">
                      <span className="vp-name">{v.name}<span className="vp-region">{v.region}</span></span>
                      <span className="vp-desc">{v.desc}</span>
                    </span>
                    {selVoice===v.name && <Icon name="check" size={16} stroke={3}/>}
                  </button>
                ))}
              </div>
              <div className="vp-speed">
                <span className="vp-speed-lbl">Tốc độ đọc</span>
                <div className="seg">{SPEEDS.map(s=><button key={s} className={selSpeed===s?'on':''} onClick={()=>setSelSpeed(s)}>{s}</button>)}</div>
              </div>
              <div className="vp-foot">
                <button className="btn btn-ghost" onClick={()=>setPickerOpen(false)}>Huỷ</button>
                <button className="btn btn-primary" onClick={regen}><Icon name="refresh" size={15}/>Tạo lại với giọng này</button>
              </div>
            </div>
          )}
        </div>
        <button className="btn btn-primary"><Icon name="save" size={15}/>Lưu sách nói</button>
      </div>
    </div>
  );
}

Object.assign(window, { LESSON, ReadingBody, AudioBody, VersionBar });
