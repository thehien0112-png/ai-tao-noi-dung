// ===== Màn giao bài cho học sinh =====
const CLASSES = [
  { id:'2a', name:'Lớp 2A' },
  { id:'2b', name:'Lớp 2B' },
  { id:'2c', name:'Lớp 2C' },
];
// roster mẫu, mỗi HS thuộc 1 nhóm trình độ
const ROSTER = {
  '2a': [
    {id:'a1',name:'Nguyễn Bảo An',grp:'yeu'},   {id:'a2',name:'Trần Gia Bình',grp:'yeu'},
    {id:'a3',name:'Lê Minh Châu',grp:'yeu'},     {id:'a4',name:'Phạm Hải Đăng',grp:'yeu'},
    {id:'a5',name:'Vũ Khánh Hà',grp:'kha'},      {id:'a6',name:'Đỗ Gia Hân',grp:'kha'},
    {id:'a7',name:'Bùi Tuấn Kiệt',grp:'kha'},    {id:'a8',name:'Hoàng Bảo Lâm',grp:'kha'},
    {id:'a9',name:'Ngô Thảo My',grp:'kha'},      {id:'a10',name:'Dương Minh Quân',grp:'gioi'},
    {id:'a11',name:'Đặng Yến Nhi',grp:'gioi'},   {id:'a12',name:'Lý Gia Huy',grp:'gioi'},
  ],
  '2b': [
    {id:'b1',name:'Trịnh Bảo Long',grp:'yeu'},   {id:'b2',name:'Mai Phương Linh',grp:'yeu'},
    {id:'b3',name:'Tạ Đức Anh',grp:'kha'},        {id:'b4',name:'Cao Thuỳ Dương',grp:'kha'},
    {id:'b5',name:'Phan Nhật Nam',grp:'kha'},     {id:'b6',name:'Hồ Khánh Vy',grp:'gioi'},
    {id:'b7',name:'Lâm Tuệ Nhi',grp:'gioi'},      {id:'b8',name:'Võ Minh Khôi',grp:'gioi'},
  ],
  '2c': [
    {id:'c1',name:'Đoàn Bảo Ngọc',grp:'yeu'},     {id:'c2',name:'Tô Gia Bảo',grp:'yeu'},
    {id:'c3',name:'Hà Minh Thư',grp:'kha'},        {id:'c4',name:'Chu Đức Duy',grp:'kha'},
    {id:'c5',name:'Lương Hà Vi',grp:'gioi'},       {id:'c6',name:'Nguyễn Tuấn Anh',grp:'gioi'},
  ],
};
const GRP_ORDER = ['yeu','kha','gioi'];

function AssignModal({groupQ, totalAssigned, title, onClose, onDone}){
  const GROUP_BY_ID = window.GROUP_BY_ID;
  const qTotal = GRP_ORDER.reduce((a,g)=>a+(groupQ[g]||0),0)+(groupQ.lop||0);
  const [cls, setCls] = React.useState('2a');
  const [picked, setPicked] = React.useState(()=> new Set(ROSTER['2a'].map(s=>s.id)));
  const [date, setDate] = React.useState('2026-06-16');
  const [time, setTime] = React.useState('17:00');
  const [note, setNote] = React.useState('');
  const [done, setDone] = React.useState(false);

  const roster = ROSTER[cls] || [];
  const changeClass = id => { setCls(id); setPicked(new Set(ROSTER[id].map(s=>s.id))); };
  const toggleStu = id => setPicked(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});
  const grpStudents = g => roster.filter(s=>s.grp===g);
  const toggleGrp = g => { const ids=grpStudents(g).map(s=>s.id); const allOn=ids.every(i=>picked.has(i));
    setPicked(s=>{const n=new Set(s); ids.forEach(i=>allOn?n.delete(i):n.add(i)); return n;}); };

  const pickedCount = roster.filter(s=>picked.has(s.id)).length;
  const clsName = CLASSES.find(c=>c.id===cls)?.name;

  if(done) return (
    <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="assign-modal">
        <div className="done-hero" style={{padding:'40px 24px'}}>
          <div className="ring"><Icon name="check" size={40} stroke={3}/></div>
          <h3>Đã giao bài thành công!</h3>
          <p>Đã giao {qTotal>0?<><b>{totalAssigned} câu hỏi</b></>:<><b>bài học{title?` “${title}”`:''}</b></>} cho <b>{pickedCount} học sinh</b> {clsName}.<br/>
            Hạn nộp: <b>{time} ngày {date.split('-').reverse().join('/')}</b>.</p>
          <button className="btn btn-primary btn-lg" style={{marginTop:18}} onClick={onClose}>
            <Icon name="check" size={16} stroke={3}/>Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="assign-modal">
        <div className="hist-head">
          <h3><Icon name="send" size={18}/>Giao bài cho học sinh</h3>
          <button className="wz-close" onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="assign-body">
          {/* tóm tắt câu hỏi theo nhóm */}
          <div className="as-summary">
            {qTotal>0 ? (<>
              <div className="as-sum-label">Câu hỏi sẽ giao theo nhóm trình độ:</div>
              <div className="as-sum-chips">
                {GRP_ORDER.map(g=>(
                  <span className="as-sum-chip" key={g} style={{background:GROUP_BY_ID[g].bg,color:GROUP_BY_ID[g].color}}>
                    {GROUP_BY_ID[g].name}: <b>{groupQ[g]||0}</b> câu
                  </span>
                ))}
                {groupQ.lop>0 && <span className="as-sum-chip" style={{background:GROUP_BY_ID.lop.bg,color:GROUP_BY_ID.lop.color}}>Cả lớp: <b>{groupQ.lop}</b> câu</span>}
              </div>
            </>) : (
              <div className="as-sum-label" style={{margin:0,display:'flex',alignItems:'center',gap:8}}>
                <Icon name="layers" size={16}/>Giao toàn bộ nội dung bài học{title?<> “<b>{title}</b>”</>:''} cho học sinh đã chọn.
              </div>
            )}
          </div>

          {/* chọn lớp */}
          <div className="as-field">
            <label className="lbl-sm">Chọn lớp</label>
            <div className="cls-tabs">
              {CLASSES.map(c=>(
                <button key={c.id} className={'cls-tab'+(cls===c.id?' on':'')} onClick={()=>changeClass(c.id)}>
                  {c.name}<span className="ct-n">{ROSTER[c.id].length} HS</span>
                </button>
              ))}
            </div>
          </div>

          {/* chọn học sinh theo nhóm */}
          <div className="as-field">
            <div className="as-row-label">
              <label className="lbl-sm" style={{margin:0}}>Chọn học sinh nhận bài</label>
              <span className="muted" style={{fontSize:13}}>Đã chọn <b style={{color:'var(--ink)'}}>{pickedCount}</b>/{roster.length} HS</span>
            </div>
            <div className="grp-cards">
              {GRP_ORDER.map(g=>{
                const studs=grpStudents(g); if(!studs.length) return null;
                const onCnt=studs.filter(s=>picked.has(s.id)).length;
                const gi=GROUP_BY_ID[g];
                return (
                  <div className="grp-card" key={g}>
                    <div className="gc-head" onClick={()=>toggleGrp(g)}>
                      <Check on={onCnt===studs.length} indet={onCnt>0&&onCnt<studs.length}/>
                      <span className="ac-dot" style={{background:gi.color}}></span>
                      <span className="gc-name">{gi.name}</span>
                      <span className="gc-q" style={{color:gi.color,background:gi.bg}}>nhận {groupQ[g]||0} câu · {gi.sug}</span>
                    </div>
                    <div className="gc-students">
                      {studs.map(s=>(
                        <label className={'stu'+(picked.has(s.id)?' on':'')} key={s.id} onClick={()=>toggleStu(s.id)}>
                          <Check on={picked.has(s.id)}/>{s.name}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* hạn nộp + ghi chú */}
          <div className="as-due">
            <div>
              <label className="lbl-sm"><Icon name="calendar" size={14}/> Hạn nộp — ngày</label>
              <input type="date" className="ctrl" value={date} onChange={e=>setDate(e.target.value)}/>
            </div>
            <div>
              <label className="lbl-sm"><Icon name="clock2" size={14}/> Giờ</label>
              <input type="time" className="ctrl" value={time} onChange={e=>setTime(e.target.value)}/>
            </div>
            <div className="as-note">
              <label className="lbl-sm">Lời nhắn cho học sinh (tuỳ chọn)</label>
              <input className="ctrl" placeholder="VD: Các em hoàn thành trước giờ học nhé!" value={note} onChange={e=>setNote(e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="wz-foot">
          <button className="btn" onClick={onClose}>Huỷ</button>
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <span className="foot-info">Giao {qTotal>0?<><b>{totalAssigned}</b> câu</>:<>bài học</>} cho <b>{pickedCount}</b> HS {clsName}</span>
            <button className="btn btn-primary btn-lg" disabled={pickedCount===0} onClick={()=>setDone(true)}>
              <Icon name="send" size={16}/>Giao bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AssignModal });
