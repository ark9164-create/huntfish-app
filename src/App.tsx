import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Calendar, Heart, X, Clock, ChevronRight, ChevronLeft, Bookmark, ArrowRight, Check, User, Award, Eye, ChevronDown, Shield, Sun } from 'lucide-react';
import {
  FISH_THEME, HUNT_THEME, FISH_LOCATIONS, HUNT_LOCATIONS,
  EXP_LEVELS, GUIDES, SPECIES,
  getAvailableDaysInRange, getConditionsForDate,
} from './data';
import type { Guide, Theme } from './data';
import ChatDrawer, { ChatTrigger } from './ChatDrawer';

const serif = "'Playfair Display', Georgia, serif";
const sans = "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif";
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_ABBR = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function MiniCalendar({ guide, month, year, theme, compact }: { guide: Guide; month: number; year: number; theme: Theme; compact?: boolean }) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const available = getAvailableDaysInRange(guide, firstDay, lastDay);

  const cells: Array<{ day: number; avail: boolean; dateStr: string } | null> = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, avail: available.has(dateStr), dateStr });
  }

  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const sz = compact ? 18 : 22;
  const font = compact ? 8 : 10;

  return (
    <div>
      <div style={{ fontSize: compact ? 10 : 12, fontWeight: 700, color: '#6b7280', marginBottom: compact ? 4 : 8, textAlign: 'center' }}>
        {names[month]} {year}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: compact ? 1 : 2 }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ width: sz, height: compact ? 12 : 14, fontSize: compact ? 7 : 9, color: '#9ca3af', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div
            key={i}
            title={d?.avail ? getConditionsForDate(guide, d.dateStr)?.conditions || '' : ''}
            style={{
              width: sz, height: sz, borderRadius: compact ? 3 : 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: font, fontWeight: d?.avail ? 700 : 400,
              backgroundColor: d?.avail ? theme.accent + '20' : 'transparent',
              color: d?.avail ? theme.accentDark : d ? '#c1c1b8' : 'transparent',
              border: d?.avail ? `1.5px solid ${theme.accent}55` : '1px solid transparent',
              cursor: d?.avail ? 'pointer' : 'default',
              transition: 'background-color 0.15s ease',
            }}
          >
            {d?.day || ''}
          </div>
        ))}
      </div>
      {!compact && <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 6, textAlign: 'center' }}>{available.size} days available</div>}
    </div>
  );
}

function AvailabilityPreview({ guide, theme }: { guide: Guide; theme: Theme }) {
  const now = new Date(2026, 4, 6);
  const upcoming = guide.availability
    .filter(w => new Date(w.endDate + 'T00:00:00') >= now)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const next = upcoming[0];
  if (!next) return null;

  const start = new Date(next.startDate + 'T00:00:00');
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const label = `${monthNames[start.getMonth()]} ${start.getDate()}`;

  const totalDays = upcoming.reduce((sum, w) => {
    const s = new Date(w.startDate + 'T00:00:00');
    const e = new Date(w.endDate + 'T00:00:00');
    return sum + Math.round((e.getTime() - s.getTime()) / 86400000) + 1;
  }, 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6b7280', marginTop: 6, marginBottom: 4 }}>
      <Calendar size={11} color={theme.accent} />
      <span>Next: <strong style={{ color: theme.accentDark }}>{label}</strong></span>
      <span style={{ color: '#d1d5db' }}>·</span>
      <span>{next.weather}</span>
      <span style={{ marginLeft: 'auto', fontSize: 10, color: theme.accent, fontWeight: 600 }}>{totalDays} days open</span>
    </div>
  );
}

function CredentialBadges({ guide, theme, compact }: { guide: Guide; theme: Theme; compact?: boolean }) {
  const cred = guide.credentials;
  const sz = compact ? 9 : 10;
  const pad = compact ? '1px 6px' : '2px 8px';
  const fs = compact ? 9 : 10;
  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: compact ? 4 : 0 }}>
      {cred.uscg && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, backgroundColor: '#f0fdf4', color: '#166534', padding: pad, borderRadius: 6, fontSize: fs, fontWeight: 600 }}>
          <Shield size={sz} /> USCG
        </span>
      )}
      <span style={{ display: 'flex', alignItems: 'center', gap: 3, backgroundColor: '#eff6ff', color: '#1e40af', padding: pad, borderRadius: 6, fontSize: fs, fontWeight: 600 }}>
        <Award size={sz} /> Licensed
      </span>
      {cred.insurance && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, backgroundColor: '#fefce8', color: '#854d0e', padding: pad, borderRadius: 6, fontSize: fs, fontWeight: 600 }}>
          <Shield size={sz} /> Insured
        </span>
      )}
      {cred.endorsements?.map(e => (
        <span key={e} style={{ display: 'flex', alignItems: 'center', gap: 3, backgroundColor: theme.tagBg, color: theme.tagText, padding: pad, borderRadius: 6, fontSize: fs, fontWeight: 600 }}>
          <Check size={sz} /> {e}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<'fish' | 'hunt'>('fish');
  const [tab, setTab] = useState('explore');
  const [sub, setSub] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [favGuides, setFavGuides] = useState<Set<number>>(new Set());
  const [savedSpecies, setSavedSpecies] = useState<Set<number>>(new Set());
  const [bookingMsg, setBookingMsg] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [where, setWhere] = useState('Anywhere');
  const [rangeStart, setRangeStart] = useState<Date|null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date|null>(null);
  const [hoverDate, setHoverDate] = useState<Date|null>(null);
  const [calMonth, setCalMonth] = useState(() => { const n = new Date(); return { year: n.getFullYear(), month: n.getMonth() }; });
  const [expLevel, setExpLevel] = useState('all');
  const [showResults, setShowResults] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [speciesSearch, setSpeciesSearch] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(4);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  useEffect(() => {
    document.body.style.overflow = selectedGuide ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedGuide]);

  const theme = mode === 'fish' ? FISH_THEME : HUNT_THEME;
  const fishSubs: [string,string][] = [['all','All'],['fly','Fly Fishing'],['deep-sea','Deep Sea'],['spin','Spin']];
  const huntSubs: [string,string][] = [['all','All'],['bow','Bow'],['gun','Gun']];
  const subs = mode === 'fish' ? fishSubs : huntSubs;
  const locations = mode === 'fish' ? FISH_LOCATIONS : HUNT_LOCATIONS;

  // Calendar helpers
  const getDaysInMonth = (y:number,m:number) => new Date(y,m+1,0).getDate();
  const getFirstDow = (y:number,m:number) => new Date(y,m,1).getDay();
  const isSameDay = (a:Date,b:Date) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
  const todayDate = new Date(); todayDate.setHours(0,0,0,0);
  const isBeforeToday = (d:Date) => { const c = new Date(d); c.setHours(0,0,0,0); return c < todayDate; };
  const isInRange = (d:Date, s:Date|null, e:Date|null) => { if (!s||!e) return false; const t=d.getTime(); return t>=s.getTime()&&t<=e.getTime(); };
  const isInPreview = (d:Date) => { if (!rangeStart||rangeEnd||!hoverDate) return false; const t=d.getTime(),a=rangeStart.getTime(),b=hoverDate.getTime(); return a<b ? (t>=a&&t<=b) : (t>=b&&t<=a); };

  const dateToSeason = (d:Date) => { const m=d.getMonth(); if(m>=2&&m<=4) return 'spring'; if(m>=5&&m<=7) return 'summer'; if(m>=8&&m<=10) return 'fall'; return 'winter'; };
  const getRangeSeasons = (s:Date, e:Date) => { const set=new Set<string>(); const cur=new Date(s); const end=new Date(e); while(cur<=end){ set.add(dateToSeason(cur)); cur.setDate(cur.getDate()+1); } return set; };

  const handleDateClick = (d:Date) => {
    if (isBeforeToday(d)) return;
    if (!rangeStart || rangeEnd) { setRangeStart(d); setRangeEnd(null); setHoverDate(null); return; }
    if (d.getTime() < rangeStart.getTime()) { setRangeStart(d); return; }
    if (isSameDay(d, rangeStart)) return;
    setRangeEnd(d); setHoverDate(null);
    setTimeout(()=>setActivePanel(null), 350);
  };

  const calNext = { year: calMonth.month===11 ? calMonth.year+1 : calMonth.year, month: (calMonth.month+1)%12 };
  const canGoPrev = !(calMonth.year===todayDate.getFullYear() && calMonth.month===todayDate.getMonth());
  const goCalPrev = () => { if(!canGoPrev) return; setCalMonth(p=>({year:p.month===0?p.year-1:p.year,month:p.month===0?11:p.month-1})); };
  const goCalNext = () => setCalMonth(p=>({year:p.month===11?p.year+1:p.year,month:(p.month+1)%12}));

  const buildMonthCells = (y:number,m:number) => {
    const days:Array<Date|null> = [];
    const first = getFirstDow(y,m);
    for(let i=0;i<first;i++) days.push(null);
    const count = getDaysInMonth(y,m);
    for(let d=1;d<=count;d++) days.push(new Date(y,m,d));
    return days;
  };

  const fmtShort = (d:Date) => d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  const whenDisplay = rangeStart
    ? (rangeEnd
        ? (rangeStart.getMonth()===rangeEnd.getMonth()&&rangeStart.getFullYear()===rangeEnd.getFullYear()
            ? `${fmtShort(rangeStart)} – ${rangeEnd.getDate()}`
            : `${fmtShort(rangeStart)} – ${fmtShort(rangeEnd)}`)
        : fmtShort(rangeStart))
    : 'Anytime';

  const filteredGuides = GUIDES.filter(g => {
    if (g.type !== mode) return false;
    if (sub !== 'all' && !g.sub.includes(sub)) return false;
    if (where !== 'Anywhere' && !g.loc.toLowerCase().includes(where.toLowerCase().split(',')[0].toLowerCase().trim().substring(0,4))) return false;
    if (rangeStart) {
      const checkEnd = rangeEnd || rangeStart;
      const cur = new Date(rangeStart); cur.setHours(0,0,0,0);
      const end = new Date(checkEnd); end.setHours(0,0,0,0);
      let allCovered = true;
      while (cur <= end) {
        const ds = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,'0')}-${String(cur.getDate()).padStart(2,'0')}`;
        let ok = false;
        for (const w of g.availability) { if (ds >= w.startDate && ds <= w.endDate) { ok = true; break; } }
        if (!ok) { allCovered = false; break; }
        cur.setDate(cur.getDate()+1);
      }
      if (!allCovered) return false;
    }
    if (expLevel !== 'all' && !g.levels.includes(expLevel)) return false;
    if (speciesSearch && !g.species.some(s => s.toLowerCase().includes(speciesSearch.toLowerCase())) && !g.loc.toLowerCase().includes(speciesSearch.toLowerCase()) && !g.name.toLowerCase().includes(speciesSearch.toLowerCase())) return false;
    return true;
  });

  const filteredSpecies = SPECIES.filter(s => {
    if (s.type !== mode) return false;
    if (sub !== 'all' && !s.sub.includes(sub)) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const myBucketList = SPECIES.filter(s => savedSpecies.has(s.id));
  const toggleFav = (id: number) => setFavGuides(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSave = (id: number) => setSavedSpecies(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const findGuidesFor = (speciesName: string) => { setTab('explore'); setSpeciesSearch(speciesName); setSub('all'); setShowResults(true); };
  const handleSearch = () => { setShowResults(true); setActivePanel(null); };
  const resetSearch = () => { setShowResults(false); setWhere('Anywhere'); setRangeStart(null); setRangeEnd(null); setHoverDate(null); setExpLevel('all'); setSpeciesSearch(''); setActivePanel(null); const n=new Date(); setCalMonth({year:n.getFullYear(),month:n.getMonth()}); };

  const diffDots = (d: number) => Array.from({length:5}, (_,i) => (
    <span key={i} style={{width:7,height:7,borderRadius:'50%',backgroundColor: i < d ? theme.accent : '#d1d5db',display:'inline-block',marginRight:2,transition:'background-color 0.5s ease'}}/>
  ));

  const expLabel = EXP_LEVELS.find(e => e.val === expLevel)?.label || 'Any Level';

  return (
    <div style={{fontFamily:sans,backgroundColor:theme.bg,minHeight:'100vh',transition:'background-color 0.6s ease',color:'#1a1a17'}} onClick={()=>activePanel&&setActivePanel(null)}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } } @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } } @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } } .fade-up { animation: fadeUp 0.6s ease forwards; opacity:0; } .scale-in { animation: scaleIn 0.3s ease forwards; } .slide-down { animation: slideDown 0.25s ease forwards; } .g-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor:pointer; } .g-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; } .heart-btn { transition: transform 0.2s ease; } .heart-btn:hover { transform: scale(1.2); } .pill-btn { transition: all 0.3s ease; } .pill-btn:hover { opacity:0.85; } .search-field { transition: all 0.3s ease; } .search-field:hover { background-color: #f0f0ec !important; } .loc-btn { transition: all 0.15s ease; } .loc-btn:hover { background-color: #f3f4f6 !important; } .season-card { transition: all 0.2s ease; cursor:pointer; } .season-card:hover { transform:scale(1.03); } .exp-card { transition: all 0.2s ease; cursor:pointer; } .exp-card:hover { transform:scale(1.02); } * { box-sizing: border-box; } ::-webkit-scrollbar { height:6px; } ::-webkit-scrollbar-thumb { background:#c1c1b8; border-radius:3px; }`}</style>

      {/* HEADER */}
      <header style={{position:'sticky',top:0,zIndex:100,backgroundColor:'#ffffff',borderBottom:'1px solid #e5e7eb',padding:'0 20px',display:'flex',alignItems:'center',justifyContent:'space-between',height:56,boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}} onClick={resetSearch}>
          <span style={{fontSize:22}}>{mode==='fish'?'🎣':'🎯'}</span>
          <span style={{fontFamily:serif,fontWeight:800,fontSize:21,color:'#1a1a17',letterSpacing:'-0.5px'}}>HuntFish</span>
        </div>
        <div style={{display:'flex',gap:4}}>
          {([['explore','Explore'],['bucketlist','Bucket List']] as [string,string][]).map(([k,v]) => (
            <button key={k} onClick={()=>{setTab(k);setSearch('');if(k==='explore'){setShowResults(false);setSpeciesSearch('');}}} className="pill-btn" style={{padding:'7px 16px',borderRadius:20,border:'none',cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:sans,backgroundColor:tab===k?theme.accent:'transparent',color:tab===k?'#fff':'#6b7280'}}>
              {v}
              {k==='bucketlist' && savedSpecies.size > 0 && <span style={{marginLeft:5,backgroundColor:tab===k?'rgba(255,255,255,0.3)':theme.accent,color:'#fff',borderRadius:10,padding:'1px 6px',fontSize:10,fontWeight:700}}>{savedSpecies.size}</span>}
            </button>
          ))}
        </div>
        <div style={{width:34,height:34,borderRadius:'50%',backgroundColor:'#f3f4f6',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <User size={16} color="#6b7280"/>
        </div>
      </header>

      {/* HERO */}
      <div style={{background:theme.hero,padding:showResults?'24px 20px 32px':'36px 20px 50px',transition:'all 0.5s ease',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.07) 0%, transparent 60%)'}}/>
        <div style={{maxWidth:800,margin:'0 auto',position:'relative',zIndex:1,textAlign:'center'}}>
          {!showResults && tab==='explore' && (
            <>
              <h1 className={loaded?'fade-up':''} style={{fontFamily:serif,fontSize:'clamp(26px,4.5vw,40px)',fontWeight:800,color:'#fff',margin:'0 0 6px',letterSpacing:'-1px',lineHeight:1.1}}>
                {mode==='fish'?'Find Your Perfect Fishing Guide':'Find Your Perfect Hunting Guide'}
              </h1>
              <p className={loaded?'fade-up':''} style={{color:'rgba(255,255,255,0.7)',fontSize:15,margin:'0 0 24px',animationDelay:'0.1s'}}>
                Top-rated guides across America. Book in minutes.
              </p>
            </>
          )}
          {tab==='bucketlist' && (
            <>
              <h1 className={loaded?'fade-up':''} style={{fontFamily:serif,fontSize:'clamp(26px,4.5vw,40px)',fontWeight:800,color:'#fff',margin:'0 0 6px',letterSpacing:'-1px',lineHeight:1.1}}>
                Your Adventure Bucket List
              </h1>
              <p className={loaded?'fade-up':''} style={{color:'rgba(255,255,255,0.7)',fontSize:15,margin:'0 0 24px',animationDelay:'0.1s'}}>
                Every species. Where, when, and how. Save your dream trips.
              </p>
            </>
          )}
          <div className={loaded?'fade-up':''} style={{display:'inline-flex',backgroundColor:'rgba(0,0,0,0.3)',borderRadius:14,padding:3,gap:3,animationDelay:'0.15s',backdropFilter:'blur(10px)'}}>
            {([['fish','🎣 FISH'],['hunt','🎯 HUNT']] as [string,string][]).map(([k,v]) => (
              <button key={k} onClick={()=>{setMode(k as 'fish'|'hunt');setSub('all');setSearch('');setShowResults(false);setWhere('Anywhere');setRangeStart(null);setRangeEnd(null);setHoverDate(null);setExpLevel('all');setSpeciesSearch('');const n=new Date();setCalMonth({year:n.getFullYear(),month:n.getMonth()});}} className="pill-btn" style={{padding:'11px 32px',borderRadius:11,border:'none',cursor:'pointer',fontSize:15,fontWeight:700,fontFamily:sans,letterSpacing:'0.5px',backgroundColor:mode===k?'#fff':'transparent',color:mode===k?'#1a1a17':'rgba(255,255,255,0.8)',boxShadow:mode===k?'0 2px 8px rgba(0,0,0,0.15)':'none'}}>
                {v}
              </button>
            ))}
          </div>
          <div className={loaded?'fade-up':''} style={{display:'flex',justifyContent:'center',gap:8,marginTop:14,animationDelay:'0.2s',flexWrap:'wrap'}}>
            {subs.map(([k,v]) => (
              <button key={k} onClick={()=>{setSub(k);if(showResults) setShowResults(true);}} className="pill-btn" style={{padding:'6px 16px',borderRadius:20,border:sub===k?'2px solid #fff':'2px solid rgba(255,255,255,0.25)',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,backgroundColor:sub===k?'rgba(255,255,255,0.2)':'transparent',color:'#fff',backdropFilter:'blur(4px)'}}>
                {v}
              </button>
            ))}
          </div>
          {showResults && tab==='explore' && (
            <div className="fade-up" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:8,marginTop:14,flexWrap:'wrap'}}>
              <span style={{color:'rgba(255,255,255,0.6)',fontSize:13}}>{where} · {whenDisplay} · {expLabel}</span>
              <button onClick={resetSearch} style={{background:'rgba(255,255,255,0.2)',border:'none',borderRadius:8,padding:'4px 12px',color:'#fff',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,backdropFilter:'blur(4px)'}}>Edit Search</button>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH CRITERIA PANEL */}
      {tab === 'explore' && !showResults && (
        <div style={{maxWidth:700,margin:'-28px auto 0',padding:'0 20px',position:'relative',zIndex:30}}>
          <div className={loaded?'fade-up':''} style={{backgroundColor:'#fff',borderRadius:20,boxShadow:'0 8px 40px rgba(0,0,0,0.12)',overflow:'visible',animationDelay:'0.25s',position:'relative'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',position:'relative'}}>
              <div onClick={(e)=>{e.stopPropagation();setActivePanel(activePanel==='where'?null:'where');}} className="search-field" style={{padding:'20px 22px',cursor:'pointer',borderRadius:'20px 0 0 0',backgroundColor:activePanel==='where'?'#f9fafb':'#fff',borderRight:'1px solid #f0f0ec',position:'relative'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',marginBottom:6,display:'flex',alignItems:'center',gap:5}}><MapPin size={12} color={theme.accent}/> Where</div>
                <div style={{fontSize:15,fontWeight:600,color: where==='Anywhere'?'#9ca3af':'#1a1a17'}}>{where}</div>
              </div>
              <div onClick={(e)=>{e.stopPropagation();setActivePanel(activePanel==='when'?null:'when');}} className="search-field" style={{padding:'20px 22px',cursor:'pointer',backgroundColor:activePanel==='when'?'#f9fafb':'#fff',borderRight:'1px solid #f0f0ec'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',marginBottom:6,display:'flex',alignItems:'center',gap:5}}><Calendar size={12} color={theme.accent}/> When</div>
                <div style={{fontSize:15,fontWeight:600,color: !rangeStart?'#9ca3af':'#1a1a17'}}>{whenDisplay}</div>
              </div>
              <div onClick={(e)=>{e.stopPropagation();setActivePanel(activePanel==='exp'?null:'exp');}} className="search-field" style={{padding:'20px 22px',cursor:'pointer',borderRadius:'0 20px 0 0',backgroundColor:activePanel==='exp'?'#f9fafb':'#fff'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',marginBottom:6,display:'flex',alignItems:'center',gap:5}}><Award size={12} color={theme.accent}/> Experience</div>
                <div style={{fontSize:15,fontWeight:600,color: expLevel==='all'?'#9ca3af':'#1a1a17'}}>{expLabel}</div>
              </div>
            </div>
            <div style={{padding:'0 22px 20px',display:'flex',gap:10,alignItems:'center',borderTop:'1px solid #f0f0ec',paddingTop:16}}>
              <div style={{flex:1,display:'flex',alignItems:'center',gap:8,backgroundColor:'#f7f7f5',borderRadius:12,padding:'10px 14px'}}>
                <Search size={16} color="#9ca3af"/>
                <input value={speciesSearch} onChange={e=>setSpeciesSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSearch()} placeholder={mode==='fish'?'What species? (e.g. Tarpon, Bass, Salmon)':'What species? (e.g. Elk, Whitetail, Turkey)'} style={{border:'none',outline:'none',backgroundColor:'transparent',fontSize:14,fontFamily:sans,width:'100%',color:'#1a1a17'}}/>
                {speciesSearch && <button onClick={()=>setSpeciesSearch('')} style={{border:'none',background:'none',cursor:'pointer',padding:2}}><X size={14} color="#9ca3af"/></button>}
              </div>
              <button onClick={handleSearch} style={{padding:'12px 28px',borderRadius:12,border:'none',background:theme.hero,color:'#fff',cursor:'pointer',fontSize:15,fontWeight:700,fontFamily:sans,boxShadow:'0 4px 16px rgba(0,0,0,0.2)',display:'flex',alignItems:'center',gap:8,whiteSpace:'nowrap',transition:'all 0.5s ease',letterSpacing:'0.2px'}}>
                <Search size={16}/> Find Guides
              </button>
            </div>

            {activePanel === 'where' && (
              <div onClick={e=>e.stopPropagation()} className="slide-down" style={{position:'absolute',top:'100%',left:0,right:0,marginTop:8,backgroundColor:'#fff',borderRadius:16,boxShadow:'0 12px 48px rgba(0,0,0,0.15)',padding:20,zIndex:50,maxHeight:320,overflowY:'auto'}}>
                <p style={{fontSize:12,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 12px'}}>Popular {mode==='fish'?'Fishing':'Hunting'} Destinations</p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',gap:6}}>
                  {locations.map(loc => (
                    <button key={loc} className="loc-btn" onClick={()=>{setWhere(loc);setActivePanel(null);}} style={{padding:'10px 14px',borderRadius:10,border:where===loc?`2px solid ${theme.accent}`:'2px solid transparent',backgroundColor:where===loc?theme.accentLight:'#f9fafb',cursor:'pointer',fontSize:13,fontWeight:where===loc?700:500,fontFamily:sans,color:where===loc?theme.accentDark:'#374151',textAlign:'left',display:'flex',alignItems:'center',gap:8}}>
                      <MapPin size={14} color={where===loc?theme.accent:'#9ca3af'}/> {loc}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activePanel === 'when' && (
              <div onClick={e=>e.stopPropagation()} className="slide-down" style={{position:'absolute',top:'100%',left:0,right:0,marginTop:8,backgroundColor:'#fff',borderRadius:16,boxShadow:'0 12px 48px rgba(0,0,0,0.15)',padding:'20px 16px',zIndex:50}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                  <p style={{fontSize:12,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',margin:0}}>Select your dates</p>
                  {rangeStart && (
                    <button onClick={(e)=>{e.stopPropagation();setRangeStart(null);setRangeEnd(null);setHoverDate(null);}} style={{padding:'5px 14px',borderRadius:8,border:'1px solid #e5e7eb',backgroundColor:'#f9fafb',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,color:'#6b7280',display:'flex',alignItems:'center',gap:5}}>
                      <X size={12}/> Clear dates
                    </button>
                  )}
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                  <button onClick={(e)=>{e.stopPropagation();goCalPrev();}} style={{width:30,height:30,borderRadius:'50%',border:'1px solid #e5e7eb',backgroundColor:canGoPrev?'#fff':'#f9fafb',cursor:canGoPrev?'pointer':'default',display:'flex',alignItems:'center',justifyContent:'center',opacity:canGoPrev?1:0.3,flexShrink:0}}>
                    <ChevronLeft size={14} color="#374151"/>
                  </button>
                  <div style={{display:'flex',gap:40,justifyContent:'center',flex:1}}>
                    <span style={{fontSize:14,fontWeight:700,color:'#1a1a17',fontFamily:serif,textAlign:'center'}}>{MONTH_NAMES[calMonth.month]} {calMonth.year}</span>
                    <span style={{fontSize:14,fontWeight:700,color:'#1a1a17',fontFamily:serif,textAlign:'center'}}>{MONTH_NAMES[calNext.month]} {calNext.year}</span>
                  </div>
                  <button onClick={(e)=>{e.stopPropagation();goCalNext();}} style={{width:30,height:30,borderRadius:'50%',border:'1px solid #e5e7eb',backgroundColor:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <ChevronRight size={14} color="#374151"/>
                  </button>
                </div>
                <div style={{display:'flex',gap:16,justifyContent:'center'}}>
                  {[calMonth, calNext].map((cm, mi) => {
                    const cells = buildMonthCells(cm.year, cm.month);
                    return (
                      <div key={mi} style={{flex:'1 1 0',minWidth:0,maxWidth:290}}>
                        <div style={{display:'grid',gridTemplateColumns:'repeat(7, 1fr)',marginBottom:4}}>
                          {DAY_ABBR.map(d=>(
                            <div key={d} style={{textAlign:'center',fontSize:11,fontWeight:600,color:'#9ca3af',padding:'4px 0'}}>{d}</div>
                          ))}
                        </div>
                        <div style={{display:'grid',gridTemplateColumns:'repeat(7, 1fr)'}}>
                          {cells.map((day,i)=>{
                            if(!day) return <div key={`e${i}`} style={{height:36}}/>;
                            const past = isBeforeToday(day);
                            const today = isSameDay(day, todayDate);
                            const isStart = rangeStart && isSameDay(day, rangeStart);
                            const isEnd = rangeEnd && isSameDay(day, rangeEnd);
                            const inRng = isInRange(day, rangeStart, rangeEnd);
                            const inPrv = isInPreview(day);
                            const showBand = (inRng || inPrv) && !isStart && !isEnd;
                            const isEndpoint = isStart || isEnd;
                            const bandLeft = isStart && (rangeEnd || hoverDate);
                            const bandRight = isEnd;
                            return (
                              <div key={i}
                                onClick={(e)=>{e.stopPropagation();handleDateClick(day);}}
                                onMouseEnter={()=>{ if(!past && rangeStart && !rangeEnd) setHoverDate(day); }}
                                onMouseLeave={()=>{ if(hoverDate && isSameDay(hoverDate,day)) setHoverDate(null); }}
                                style={{
                                  position:'relative', height:36, display:'flex', alignItems:'center', justifyContent:'center',
                                  cursor: past ? 'default' : 'pointer',
                                  backgroundColor: showBand ? (inPrv && !inRng ? `${theme.accent}10` : `${theme.accent}18`) : (bandLeft||bandRight) ? `${theme.accent}18` : 'transparent',
                                  borderRadius: bandLeft ? '50% 0 0 50%' : bandRight ? '0 50% 50% 0' : 0,
                                }}>
                                <div style={{
                                  width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center',
                                  borderRadius:'50%',
                                  backgroundColor: isEndpoint ? theme.accent : 'transparent',
                                  border: today && !isEndpoint ? `2px solid ${theme.accent}` : 'none',
                                  transition: 'background-color 0.15s ease',
                                }}>
                                  <span style={{
                                    fontSize:13, fontWeight: isEndpoint ? 700 : today ? 600 : 400,
                                    color: isEndpoint ? '#fff' : past ? '#d1d5db' : '#1a1a17',
                                    fontFamily: sans,
                                  }}>{day.getDate()}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {rangeStart && (
                  <div style={{marginTop:14,paddingTop:12,borderTop:'1px solid #f0f0ec',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:13,color:'#6b7280'}}>
                      {rangeEnd ? `${fmtShort(rangeStart)} – ${fmtShort(rangeEnd)}` : 'Select an end date'}
                    </span>
                    <button onClick={(e)=>{e.stopPropagation();setActivePanel(null);}} style={{padding:'8px 20px',borderRadius:10,border:'none',background:theme.hero,color:'#fff',cursor:'pointer',fontSize:13,fontWeight:700,fontFamily:sans,boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>
                      Done
                    </button>
                  </div>
                )}
              </div>
            )}
            {activePanel === 'exp' && (
              <div onClick={e=>e.stopPropagation()} className="slide-down" style={{position:'absolute',top:'100%',left:0,right:0,marginTop:8,backgroundColor:'#fff',borderRadius:16,boxShadow:'0 12px 48px rgba(0,0,0,0.15)',padding:20,zIndex:50}}>
                <p style={{fontSize:12,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 14px'}}>What's your experience level?</p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:10}}>
                  {EXP_LEVELS.map(e => (
                    <div key={e.val} className="exp-card" onClick={()=>{setExpLevel(e.val);setActivePanel(null);}} style={{padding:'18px 16px',borderRadius:14,border:expLevel===e.val?`2px solid ${theme.accent}`:'2px solid #f0f0ec',backgroundColor:expLevel===e.val?theme.accentLight:'#fff',cursor:'pointer',display:'flex',alignItems:'center',gap:14}}>
                      <div style={{fontSize:28}}>{e.emoji}</div>
                      <div>
                        <div style={{fontSize:15,fontWeight:700,color:expLevel===e.val?theme.accentDark:'#1a1a17'}}>{e.label}</div>
                        <div style={{fontSize:12,color:'#9ca3af',marginTop:1}}>{e.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{maxWidth:1100,margin:'0 auto',padding: (tab==='explore' && !showResults) ? '40px 20px 60px' : '28px 20px 60px'}} onClick={()=>activePanel&&setActivePanel(null)}>

        {/* EXPLORE RESULTS */}
        {tab === 'explore' && showResults && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{fontFamily:serif,fontSize:24,fontWeight:700,margin:0}}>
                {speciesSearch ? `Guides for "${speciesSearch}"` : 'Matching Guides'} <span style={{color:'#9ca3af',fontFamily:sans,fontSize:14,fontWeight:400}}>({filteredGuides.length})</span>
              </h2>
              <div style={{display:'flex',alignItems:'center',gap:8,backgroundColor:'#fff',borderRadius:10,padding:'6px 12px',border:'1px solid #e5e7eb'}}>
                <Search size={14} color="#9ca3af"/>
                <input value={speciesSearch} onChange={e=>setSpeciesSearch(e.target.value)} placeholder="Filter species..." style={{border:'none',outline:'none',backgroundColor:'transparent',fontSize:13,fontFamily:sans,width:130,color:'#1a1a17'}}/>
              </div>
            </div>

            {filteredGuides.length === 0 ? (
              <div style={{textAlign:'center',padding:'60px 20px'}}>
                <div style={{width:64,height:64,borderRadius:'50%',backgroundColor:'#f3f4f6',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
                  <Search size={28} color="#d1d5db"/>
                </div>
                <p style={{fontSize:18,fontWeight:700,color:'#374151',margin:'0 0 6px',fontFamily:serif}}>No guides match your criteria</p>
                <p style={{fontSize:14,color:'#9ca3af',margin:'0 0 20px'}}>Try broadening your location, season, or experience level</p>
                <button onClick={resetSearch} style={{padding:'10px 24px',borderRadius:10,border:'none',backgroundColor:theme.accent,color:'#fff',cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:sans}}>Edit Search</button>
              </div>
            ) : (
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',gap:20}}>
                {filteredGuides.map((g, i) => (
                  <div key={g.id} className="g-card fade-up" style={{backgroundColor:'#fff',borderRadius:16,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',animationDelay:`${i*0.07}s`,border:'1px solid #f0f0ec'}}>
                    <div style={{height:170,background:`linear-gradient(135deg, ${g.catches[0]?.g[0]||'#333'} 0%, ${g.catches[0]?.g[1]||'#999'} 100%)`,position:'relative',padding:14,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                          {g.sub.map(s => (
                            <span key={s} style={{backgroundColor:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',color:'#fff',padding:'3px 10px',borderRadius:12,fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px'}}>{s}</span>
                          ))}
                        </div>
                        <button className="heart-btn" onClick={(e)=>{e.stopPropagation();toggleFav(g.id);}} style={{width:34,height:34,borderRadius:'50%',backgroundColor:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <Heart size={16} color="#fff" fill={favGuides.has(g.id)?'#fff':'none'} strokeWidth={2}/>
                        </button>
                      </div>
                      <div style={{display:'flex',gap:5,overflow:'auto',paddingBottom:2}}>
                        {g.catches.slice(0,3).map((c,j) => (
                          <span key={j} style={{backgroundColor:'rgba(0,0,0,0.4)',backdropFilter:'blur(8px)',color:'#fff',padding:'3px 9px',borderRadius:10,fontSize:10,fontWeight:500,whiteSpace:'nowrap'}}>
                            {c.s} · {c.d} · {c.t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div onClick={()=>setSelectedGuide(g)} style={{padding:'13px 16px 15px',cursor:'pointer'}}>
                      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
                        <Star size={13} fill="#f59e0b" color="#f59e0b"/>
                        <span style={{fontSize:14,fontWeight:700}}>{g.rating}</span>
                        <span style={{fontSize:12,color:'#9ca3af'}}>({g.reviews})</span>
                        <span style={{marginLeft:'auto',fontSize:12,fontWeight:600,color:g.avail==='Available'?'#16a34a':g.avail==='Limited'?'#d97706':'#6b7280',display:'flex',alignItems:'center',gap:4}}>
                          <span style={{width:6,height:6,borderRadius:'50%',backgroundColor:g.avail==='Available'?'#16a34a':g.avail==='Limited'?'#d97706':'#9ca3af'}}/>
                          {g.avail}
                        </span>
                      </div>
                      <h3 style={{fontSize:17,fontWeight:700,margin:'0 0 3px',fontFamily:serif}}>{g.name}</h3>
                      <div style={{display:'flex',alignItems:'center',gap:4,color:'#6b7280',fontSize:12,marginBottom:8}}>
                        <MapPin size={12}/> {g.loc} <span style={{color:'#d1d5db'}}>·</span> {g.exp}
                      </div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:4}}>
                        {g.species.map(s => (
                          <span key={s} style={{backgroundColor:theme.tagBg,color:theme.tagText,padding:'2px 8px',borderRadius:8,fontSize:11,fontWeight:600,transition:'all 0.5s ease'}}>{s}</span>
                        ))}
                      </div>
                      <CredentialBadges guide={g} theme={theme} compact />
                      <AvailabilityPreview guide={g} theme={theme} />
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,margin:'8px 0 4px',backgroundColor:'#f9fafb',borderRadius:8,padding:8}}>
                        <MiniCalendar guide={g} month={4} year={2026} theme={theme} compact />
                        <MiniCalendar guide={g} month={5} year={2026} theme={theme} compact />
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:6}}>
                        <span style={{fontSize:15,fontWeight:700,color:theme.accent,transition:'color 0.5s ease'}}>{g.price}</span>
                        <span style={{fontSize:12,color:theme.accent,fontWeight:600,display:'flex',alignItems:'center',gap:4,transition:'color 0.5s ease'}}>View Profile <ChevronRight size={14}/></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EXPLORE INITIAL STATE */}
        {tab === 'explore' && !showResults && (
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <p style={{color:'#9ca3af',fontSize:14,margin:0}}>
              {mode==='fish' ? '🎣 Choose your destination, season, and experience level above to find the perfect guide' : '🎯 Choose your destination, season, and experience level above to find the perfect guide'}
            </p>
            <div style={{display:'flex',justifyContent:'center',gap:20,marginTop:32,flexWrap:'wrap'}}>
              {(mode==='fish' ? [
                {icon:'🐟',label:'Bass Fishing',s:'Largemouth Bass'},
                {icon:'🦈',label:'Deep Sea',s:'Sailfish'},
                {icon:'🎣',label:'Fly Fishing',s:'Rainbow Trout'},
                {icon:'🐟',label:'Salmon',s:'King Salmon'},
              ] : [
                {icon:'🦌',label:'Elk Hunting',s:'Elk'},
                {icon:'🦌',label:'Whitetail',s:'Whitetail'},
                {icon:'🦃',label:'Turkey',s:'Wild Turkey'},
                {icon:'🐦',label:'Bird Hunting',s:'Pheasant'},
              ]).map((q,i) => (
                <div key={i} className="g-card fade-up" onClick={()=>{setSpeciesSearch(q.s);handleSearch();}} style={{width:140,padding:'24px 16px',backgroundColor:'#fff',borderRadius:16,boxShadow:'0 2px 12px rgba(0,0,0,0.06)',textAlign:'center',cursor:'pointer',animationDelay:`${0.3+i*0.08}s`,border:'1px solid #f0f0ec'}}>
                  <div style={{fontSize:36,marginBottom:10}}>{q.icon}</div>
                  <div style={{fontSize:14,fontWeight:600,color:'#1a1a17'}}>{q.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUCKET LIST TAB */}
        {tab === 'bucketlist' && (
          <div>
            {myBucketList.length > 0 && (
              <div style={{marginBottom:36}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                  <Bookmark size={20} color={theme.accent}/>
                  <h2 style={{fontFamily:serif,fontSize:22,fontWeight:700,margin:0}}>My Bucket List</h2>
                  <span style={{backgroundColor:theme.accent,color:'#fff',borderRadius:12,padding:'2px 10px',fontSize:12,fontWeight:700,transition:'background-color 0.5s ease'}}>{myBucketList.length}</span>
                </div>
                <div style={{display:'flex',gap:14,overflowX:'auto',paddingBottom:10}}>
                  {myBucketList.map(sp => (
                    <div key={sp.id} style={{minWidth:230,background:`linear-gradient(135deg, ${sp.g[0]}, ${sp.g[1]})`,borderRadius:14,padding:16,color:'#fff',position:'relative',flexShrink:0}}>
                      <button onClick={()=>toggleSave(sp.id)} style={{position:'absolute',top:10,right:10,background:'rgba(0,0,0,0.3)',border:'none',borderRadius:'50%',width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
                        <Check size={12} color="#fff"/>
                      </button>
                      <span style={{fontSize:26}}>{sp.emoji}</span>
                      <h4 style={{fontSize:15,fontWeight:700,margin:'6px 0 3px',fontFamily:serif}}>{sp.name}</h4>
                      <p style={{fontSize:11,opacity:0.85,margin:'0 0 10px'}}>{sp.where}</p>
                      <button onClick={()=>findGuidesFor(sp.name)} style={{display:'flex',alignItems:'center',gap:4,background:'rgba(255,255,255,0.2)',border:'none',borderRadius:8,padding:'5px 11px',color:'#fff',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:sans,backdropFilter:'blur(4px)'}}>
                        Find a Guide <ArrowRight size={11}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{fontFamily:serif,fontSize:22,fontWeight:700,margin:0}}>
                Discover Adventures <span style={{color:'#9ca3af',fontFamily:sans,fontSize:14,fontWeight:400}}>({filteredSpecies.length})</span>
              </h2>
              <div style={{display:'flex',alignItems:'center',gap:8,backgroundColor:'#fff',borderRadius:10,padding:'6px 12px',border:'1px solid #e5e7eb'}}>
                <Search size={14} color="#9ca3af"/>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search species..." style={{border:'none',outline:'none',backgroundColor:'transparent',fontSize:13,fontFamily:sans,width:130,color:'#1a1a17'}}/>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:16}}>
              {filteredSpecies.map((sp, i) => (
                <div key={sp.id} className="g-card fade-up" style={{backgroundColor:'#fff',borderRadius:16,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',animationDelay:`${i*0.05}s`,border:'1px solid #f0f0ec'}}>
                  <div style={{height:90,background:`linear-gradient(135deg, ${sp.g[0]}, ${sp.g[1]})`,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',position:'relative'}}>
                    <div>
                      <span style={{fontSize:28,display:'block',marginBottom:2}}>{sp.emoji}</span>
                      <h3 style={{fontSize:17,fontWeight:800,color:'#fff',margin:0,fontFamily:serif,textShadow:'0 1px 4px rgba(0,0,0,0.3)'}}>{sp.name}</h3>
                    </div>
                    <button className="heart-btn" onClick={()=>toggleSave(sp.id)} style={{width:32,height:32,borderRadius:'50%',backgroundColor:savedSpecies.has(sp.id)?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.2)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)',transition:'all 0.3s ease'}}>
                      {savedSpecies.has(sp.id) ? <Check size={14} color={sp.g[0]}/> : <Bookmark size={14} color="#fff"/>}
                    </button>
                  </div>
                  <div style={{padding:'12px 16px 14px'}}>
                    <p style={{fontSize:12,color:'#6b7280',margin:'0 0 10px',lineHeight:1.5}}>{sp.desc}</p>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:11,color:'#4b5563'}}>
                      <div style={{display:'flex',alignItems:'flex-start',gap:5}}>
                        <MapPin size={12} color={theme.accent} style={{marginTop:1,flexShrink:0}}/>
                        <span><strong>Where:</strong> {sp.where}</span>
                      </div>
                      <div style={{display:'flex',alignItems:'flex-start',gap:5}}>
                        <Calendar size={12} color={theme.accent} style={{marginTop:1,flexShrink:0}}/>
                        <span><strong>When:</strong> {sp.when}</span>
                      </div>
                      <div style={{display:'flex',alignItems:'flex-start',gap:5}}>
                        <Eye size={12} color={theme.accent} style={{marginTop:1,flexShrink:0}}/>
                        <span><strong>How:</strong> {sp.how}</span>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:5}}>
                        <Award size={12} color={theme.accent} style={{flexShrink:0}}/>
                        <span style={{display:'flex',alignItems:'center',gap:2}}><strong>Level:</strong> {diffDots(sp.diff)}</span>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:8,marginTop:12}}>
                      <button onClick={()=>toggleSave(sp.id)} style={{flex:1,padding:'8px 12px',borderRadius:10,border:savedSpecies.has(sp.id)?`2px solid ${theme.accent}`:'2px solid #e5e7eb',backgroundColor:savedSpecies.has(sp.id)?theme.accentLight:'#fff',color:savedSpecies.has(sp.id)?theme.accentDark:'#6b7280',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,display:'flex',alignItems:'center',justifyContent:'center',gap:5,transition:'all 0.3s ease'}}>
                        {savedSpecies.has(sp.id) ? <><Check size={13}/> Saved</> : <><Bookmark size={13}/> Save</>}
                      </button>
                      <button onClick={()=>findGuidesFor(sp.name)} style={{flex:1,padding:'8px 12px',borderRadius:10,border:'none',backgroundColor:theme.accent,color:'#fff',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,display:'flex',alignItems:'center',justifyContent:'center',gap:5,transition:'background-color 0.5s ease'}}>
                        Find Guides <ArrowRight size={13}/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* GUIDE DETAIL MODAL */}
      {selectedGuide && (
        <div onClick={()=>{setSelectedGuide(null);setBookingMsg(false);setCalendarMonth(4);}} style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.6)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:20,backdropFilter:'blur(4px)'}}>
          <div onClick={e=>e.stopPropagation()} className="scale-in" style={{backgroundColor:'#fff',borderRadius:20,maxWidth:580,width:'100%',maxHeight:'90vh',overflowY:'auto',position:'relative'}}>
            <div style={{height:190,background:`linear-gradient(135deg, ${selectedGuide.catches[0]?.g[0]||'#333'}, ${selectedGuide.catches[0]?.g[1]||'#999'})`,borderRadius:'20px 20px 0 0',padding:20,display:'flex',flexDirection:'column',justifyContent:'space-between',position:'relative'}}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex',gap:6}}>
                  {selectedGuide.sub.map(s => (
                    <span key={s} style={{backgroundColor:'rgba(255,255,255,0.2)',color:'#fff',padding:'4px 12px',borderRadius:12,fontSize:11,fontWeight:600,textTransform:'uppercase',backdropFilter:'blur(8px)'}}>{s}</span>
                  ))}
                </div>
                <button onClick={()=>{setSelectedGuide(null);setBookingMsg(false);setCalendarMonth(4);}} style={{width:34,height:34,borderRadius:'50%',backgroundColor:'rgba(0,0,0,0.3)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <X size={16} color="#fff"/>
                </button>
              </div>
              <div>
                <h2 style={{fontFamily:serif,fontSize:26,fontWeight:800,color:'#fff',margin:'0 0 3px',textShadow:'0 2px 8px rgba(0,0,0,0.3)'}}>{selectedGuide.name}</h2>
                <div style={{display:'flex',alignItems:'center',gap:12,color:'rgba(255,255,255,0.9)',fontSize:13}}>
                  <span style={{display:'flex',alignItems:'center',gap:4}}><MapPin size={13}/> {selectedGuide.loc}</span>
                  <span style={{display:'flex',alignItems:'center',gap:4}}><Clock size={13}/> {selectedGuide.exp}</span>
                </div>
              </div>
            </div>
            <div style={{padding:'18px 22px 22px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,padding:'10px 14px',backgroundColor:'#f9fafb',borderRadius:12}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b"/>
                  <span style={{fontSize:18,fontWeight:800}}>{selectedGuide.rating}</span>
                  <span style={{color:'#9ca3af',fontSize:12}}>({selectedGuide.reviews} reviews)</span>
                </div>
                <div style={{fontSize:17,fontWeight:800,color:theme.accent}}>{selectedGuide.price}</div>
              </div>

              <p style={{fontSize:14,color:'#4b5563',lineHeight:1.7,margin:'0 0 14px'}}>{selectedGuide.bio}</p>

              <div style={{marginBottom:14}}>
                <h4 style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 6px'}}>Specialties</h4>
                <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                  {selectedGuide.species.map(s => (
                    <span key={s} style={{backgroundColor:theme.tagBg,color:theme.tagText,padding:'4px 11px',borderRadius:10,fontSize:12,fontWeight:600}}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{marginBottom:14}}>
                <h4 style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 6px'}}>Welcome Skill Levels</h4>
                <div style={{display:'flex',gap:5}}>
                  {selectedGuide.levels.map(l => (
                    <span key={l} style={{backgroundColor:'#f0fdf4',color:'#166534',padding:'3px 10px',borderRadius:10,fontSize:11,fontWeight:600,textTransform:'capitalize'}}>{l}</span>
                  ))}
                </div>
              </div>

              {/* CREDENTIALS */}
              <div style={{marginBottom:14}}>
                <h4 style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 8px'}}>Verified Credentials</h4>
                <div style={{backgroundColor:'#f9fafb',borderRadius:12,padding:'12px 14px'}}>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {selectedGuide.credentials.uscg && (
                      <div style={{display:'flex',alignItems:'center',gap:6,backgroundColor:'#f0fdf4',padding:'6px 12px',borderRadius:8,fontSize:12,color:'#166534',fontWeight:600}}>
                        <Shield size={14} color="#16a34a" /> {selectedGuide.credentials.uscg}
                      </div>
                    )}
                    <div style={{display:'flex',alignItems:'center',gap:6,backgroundColor:'#eff6ff',padding:'6px 12px',borderRadius:8,fontSize:12,color:'#1e40af',fontWeight:600}}>
                      <Award size={14} color="#2563eb" /> {selectedGuide.credentials.stateLicense}
                    </div>
                    {selectedGuide.credentials.insurance && (
                      <div style={{display:'flex',alignItems:'center',gap:6,backgroundColor:'#fefce8',padding:'6px 12px',borderRadius:8,fontSize:12,color:'#854d0e',fontWeight:600}}>
                        <Shield size={14} color="#ca8a04" /> Liability Insured
                      </div>
                    )}
                    {selectedGuide.credentials.endorsements?.map(e => (
                      <div key={e} style={{display:'flex',alignItems:'center',gap:6,backgroundColor:theme.accentLight,padding:'6px 12px',borderRadius:8,fontSize:12,color:theme.accentDark,fontWeight:600}}>
                        <Check size={14} color={theme.accent} /> {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AVAILABILITY CALENDAR */}
              <div style={{marginBottom:18}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                  <h4 style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',margin:0}}>Availability & Conditions</h4>
                  <div style={{display:'flex',gap:4}}>
                    <button onClick={()=>setCalendarMonth(m=>Math.max(0,m-1))} style={{width:24,height:24,borderRadius:6,border:'1px solid #e5e7eb',backgroundColor:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'#6b7280'}}>‹</button>
                    <button onClick={()=>setCalendarMonth(m=>Math.min(11,m+1))} style={{width:24,height:24,borderRadius:6,border:'1px solid #e5e7eb',backgroundColor:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'#6b7280'}}>›</button>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,backgroundColor:'#f9fafb',borderRadius:12,padding:12}}>
                  <MiniCalendar guide={selectedGuide} month={calendarMonth} year={2026} theme={theme} />
                  <MiniCalendar guide={selectedGuide} month={(calendarMonth + 1) % 12} year={calendarMonth + 1 > 11 ? 2027 : 2026} theme={theme} />
                  <MiniCalendar guide={selectedGuide} month={(calendarMonth + 2) % 12} year={calendarMonth + 2 > 11 ? 2027 : 2026} theme={theme} />
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8,fontSize:10,color:'#9ca3af'}}>
                  <span style={{display:'flex',alignItems:'center',gap:4}}><span style={{width:10,height:10,borderRadius:2,backgroundColor:theme.accent+'20',border:`1.5px solid ${theme.accent}55`}}/> Available</span>
                  <span style={{display:'flex',alignItems:'center',gap:4}}><span style={{width:10,height:10,borderRadius:2,backgroundColor:'transparent',border:'1px solid #e5e7eb'}}/> Booked</span>
                  <span style={{marginLeft:'auto',fontStyle:'italic'}}>Hover dates for conditions</span>
                </div>

                {/* Upcoming windows list */}
                <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:6}}>
                  {selectedGuide.availability
                    .filter(w => new Date(w.endDate+'T00:00:00') >= new Date(2026,4,6))
                    .sort((a,b) => a.startDate.localeCompare(b.startDate))
                    .slice(0,4)
                    .map((w, i) => {
                      const s = new Date(w.startDate+'T00:00:00');
                      const e = new Date(w.endDate+'T00:00:00');
                      const days = Math.round((e.getTime()-s.getTime())/86400000)+1;
                      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                      return (
                        <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',backgroundColor:'#fff',borderRadius:8,border:'1px solid #f0f0ec',fontSize:12}}>
                          <div style={{width:6,height:6,borderRadius:'50%',backgroundColor:theme.accent,flexShrink:0}}/>
                          <div style={{fontWeight:700,color:'#1a1a17',minWidth:100}}>{months[s.getMonth()]} {s.getDate()}–{e.getDate()}</div>
                          <div style={{color:'#6b7280',flex:1}}>{w.conditions}</div>
                          <div style={{display:'flex',alignItems:'center',gap:4,color:'#9ca3af',flexShrink:0}}>
                            <Sun size={11}/> {w.weather}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <h4 style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 8px'}}>Recent Success Stories</h4>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:8,marginBottom:20}}>
                {selectedGuide.catches.map((c,j) => (
                  <div key={j} style={{background:`linear-gradient(135deg, ${c.g[0]}, ${c.g[1]})`,borderRadius:12,padding:11,color:'#fff',aspectRatio:'1',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                    <div style={{fontSize:10,opacity:0.8,marginBottom:1}}>{c.t}</div>
                    <div style={{fontSize:13,fontWeight:700}}>{c.s}</div>
                    <div style={{fontSize:11,opacity:0.9}}>{c.d}</div>
                  </div>
                ))}
              </div>

              {bookingMsg ? (
                <div style={{backgroundColor:'#f0fdf4',border:'2px solid #86efac',borderRadius:14,padding:18,textAlign:'center'}}>
                  <div style={{width:44,height:44,borderRadius:'50%',backgroundColor:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}>
                    <Check size={22} color="#fff"/>
                  </div>
                  <h3 style={{fontFamily:serif,fontSize:18,fontWeight:700,margin:'0 0 4px',color:'#166534'}}>Booking Request Sent!</h3>
                  <p style={{fontSize:12,color:'#4b5563',margin:0}}>{selectedGuide.name} will confirm within 24 hours.</p>
                </div>
              ) : (
                <button onClick={()=>setBookingMsg(true)} style={{width:'100%',padding:'15px 20px',borderRadius:14,border:'none',background:theme.hero,color:'#fff',cursor:'pointer',fontSize:15,fontWeight:700,fontFamily:sans,letterSpacing:'0.3px',boxShadow:'0 4px 16px rgba(0,0,0,0.2)',transition:'all 0.5s ease'}}>
                  Request Booking — {selectedGuide.price}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHAT */}
      {!chatOpen && <ChatTrigger onClick={() => setChatOpen(true)} theme={theme} />}
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} theme={theme} mode={mode} />
    </div>
  );
}
