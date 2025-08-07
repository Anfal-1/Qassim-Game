'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import PalmTimer from '@/components/PalmTimer'
import GlitchCamera from '@/components/GlitchCamera'
import HeritageLogo from '@/components/HeritageLogo'

import {
  MapPin,
  Star,
  Play,
  RotateCcw,
  Share2,
  Volume2,
  VolumeX,
  Home,
  Camera,
  Eye,
} from 'lucide-react'

// استبدل مصفوفة landmarks بالمعالم المحدثة التالية:

const landmarks = [
  {
    id: 1,
    name: 'سوق المسوكف الشعبي',
    image: '/images/souq-musawkaf.jpeg',
    info: 'أُنشئ عام 1999 بإشراف بلدية عنيزة ليعيد إحياء تراث الأسواق القديمة، ويتميز بتصميم نجدي. يضم أكثر من 100 محل تعرض الحرف اليدوية مثل السدو، النجارة، العطارة، ومتحفًا تراثيًا ومسرحًا شعبيًا',
    options: ['سوق المسوكف الشعبي', 'سوق القيصرية', 'سوق الذهب القديم'],
    correctAnswer: 0,
    difficulty: 'متوسط',
    points: 15,
  },
  {
    id: 2,
    name: 'برج الشنانة',
    image: '/images/burj-shnanah.jpeg',
    info: 'بُنِي عام 1805 من الطين بارتفاع 27 مترًا في عهد الإمام سعود الكبير. كان مركز مراقبة لحماية المدينة ويتميز بشكله المخروطي. يُعد رمزًا تاريخيًا وتعليميًا في محافظة الرس',
    options: ['برج المراقبة', 'برج الشنانة', 'قلعة الرس'],
    correctAnswer: 1,
    difficulty: 'صعب',
    points: 20,
  },
  {
    id: 3,
    name: 'متحف بريدة',
    image: '/images/m-buraida.jpg',
    info: 'افتُتح عام 1999 ويعرض تاريخ المنطقة من قبل الإسلام وحتى العصر الحديث. يضم آثارًا، أدوات زراعية، مخطوطات، وعملات نادرة، ويُعتبر من أبرز المعالم السياحية ببريدة',
    options: ['متحف القصيم', 'متحف بريدة', 'متحف التراث الشعبي'],
    correctAnswer: 1,
    difficulty: 'متوسط',
    points: 15,
  },
  {
    id: 4,
    name: 'بيت البسام',
    image: '/images/beit-bassam.jpeg',
    info: 'بُني عام 1907م على يد التاجر عبد الله بن علي البسام، يتميز بالعمارة النجدية ويحتوي على غرف مفروشة وساحات داخلية. يُستخدم حاليًا كمتحف يعكس حياة نجد القديمة',
    options: ['بيت البسام', 'قصر التراث', 'بيت الطين'],
    correctAnswer: 0,
    difficulty: 'صعب',
    points: 20,
  },
  {
    id: 5,
    name: 'مقصورة السويلم',
    image: '/images/traditional-houses.jpeg',
    info: 'بُنيت أواخر القرن 19 بواسطة الشيخ عبد الله السويلم. مجمع سكني تراثي يضم مجالس وغرف ضيافة وساحات داخلية، وتُعرض فيه الحياة النجدية التقليدية',
    options: ['مقصورة السويلم', 'بيت الضيافة', 'المجلس التراثي'],
    correctAnswer: 0,
    difficulty: 'صعب',
    points: 20,
  },
  {
    id: 6,
    name: 'قصر الشيخ ابن عقيل',
    image: '/images/ibn-aqeel.jpeg',
    info: 'بُني في أوائل القرن العشرين على يد الشيخ صالح بن عقيل. منزل ضخم يحتوي على مجالس، غرف استقبال، ومخازن. كان مقرًا لإدارة شؤون البلدة',
    options: ['قصر الشيخ ابن عقيل', 'قصر الإمارة', 'بيت الحكم'],
    correctAnswer: 0,
    difficulty: 'صعب',
    points: 20,
  },
  {
    id: 7,
    name: 'برج بريدة',
    image: '/images/water-tower.jpeg',
    info: 'افتُتح عام 2008 ويقع في قلب المدينة. يبلغ ارتفاعه 133 مترًا (32 طابقًا) ويُعد أطول مبنى بالقصيم. تصميمه عصري وواجهة زجاجية مضيئة ليلًا، ويعكس تطور المدينة الحضري',
    options: ['ناطحة سحاب القصيم', 'برج بريدة', 'برج الملك عبد العزيز'],
    correctAnswer: 1,
    difficulty: 'متوسط',
    points: 15,
  },
  {
    id: 8,
    name: 'بيت الحمدان التراثي',
    image: '/images/beit-hamdan.jpeg',
    info: 'أُنشئ على الطراز النجدي باستخدام الطين وخشب الأثل. يضم أقسامًا تقليدية مثل المجلس، غرفة العروس، المسجد، ويحتوي على أكثر من 2000 قطعة تراثية. يُفتح للزوار خلال المواسم ويُعد متحفًا حيًا يعكس التراث النجدي',
    options: ['بيت الحمدان التراثي', 'قصر الطين', 'البيت النجدي'],
    correctAnswer: 0,
    difficulty: 'صعب',
    points: 20,
  },
  {
    id: 9,
    name: 'منتزهات الغضا',
    image: '/images/ghada-reserve.jpeg',
    info: 'تقع غرب عنيزة وتُعد من أبرز المعالم الطبيعية بالقصيم، تنمو فيها أشجار الغضا المعمرة. سُجلت في موسوعة غينيس كأكبر حديقة لأشجار الغضا بمساحة 172,338,379 م²',
    options: ['واحة الصحراء', 'منتزهات الغضا', 'غابات القصيم'],
    correctAnswer: 1,
    difficulty: 'متوسط',
    points: 15,
  },
  {
    id: 10,
    name: 'البلدة التراثية في المذنب',
    image: '/images/heritage-village.jpeg',
    info: 'تقع وسط محافظة المذنب، وتضم أكثر من 300 منزل طيني مبنية بأسلوب نجدي. تحتوي على ممرات ضيقة، ساحات داخلية، أسواق ومساجد قديمة، وعدد من المتاحف والمراكز الثقافية',
    options: ['البلدة التراثية في المذنب', 'القرية القديمة', 'مدينة الطين'],
    correctAnswer: 0,
    difficulty: 'صعب',
    points: 20,
  },
]

type GameState = 'landing' | 'welcome' | 'playing' | 'result' | 'finished'

interface GameStats {
  totalGames: number
  bestScore: number
  totalCorrect: number
  averageTime: number
}

export default function QassimTourismGame() {
  const [gameState, setGameState] = useState<GameState>('landing')
  const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(5)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameStats, setGameStats] = useState<GameStats>({
    totalGames: 0,
    bestScore: 0,
    totalCorrect: 0,
    averageTime: 0,
  })
  const [soundEnabled, setSoundEnabled] = useState(true)
  const getBlurClassFromPoints = (points: number) => {
    if (points <= 10) return 'blur-sm' // سهل
    if (points <= 15) return 'blur-md' // متوسط
    return 'blur-xl' // صعب
  }
  const [shuffledLandmarks, setShuffledLandmarks] = useState(landmarks)
  const [gameStartTime, setGameStartTime] = useState(0)
  const [questionStartTime, setQuestionStartTime] = useState(0)
  const [totalTimeTaken, setTotalTimeTaken] = useState(0)

  const currentLandmark = shuffledLandmarks[currentLandmarkIndex]

  // تحميل الإحصائيات من localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('qassim-game-stats')
      if (savedStats) {
        setGameStats(JSON.parse(savedStats))
      }

      const savedSound = localStorage.getItem('qassim-game-sound')
      if (savedSound !== null) {
        setSoundEnabled(JSON.parse(savedSound))
      }
    }
  }, [])

  // حفظ الإحصائيات
  const saveStats = useCallback((newStats: GameStats) => {
    setGameStats(newStats)
    if (typeof window !== 'undefined') {
      localStorage.setItem('qassim-game-stats', JSON.stringify(newStats))
    }
  }, [])

  // تشغيل الأصوات
  const playSound = useCallback(
    (type: 'correct' | 'wrong' | 'tick' | 'finish') => {
      if (!soundEnabled || typeof window === 'undefined') return

      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        switch (type) {
          case 'correct':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
            oscillator.frequency.setValueAtTime(
              1000,
              audioContext.currentTime + 0.1
            )
            break
          case 'wrong':
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
            break
          case 'tick':
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
            break
          case 'finish':
            oscillator.frequency.setValueAtTime(500, audioContext.currentTime)
            oscillator.frequency.setValueAtTime(
              800,
              audioContext.currentTime + 0.2
            )
            break
        }

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3
        )

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
      } catch (error) {
        console.log('Audio not supported')
      }
    },
    [soundEnabled]
  )

  // العداد التنازلي
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        if (timeLeft <= 5) {
          playSound('tick')
        }
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp()
    }
  }, [gameState, timeLeft, showResult, playSound])

  // خلط المعالم
  const shuffleArray = (array: typeof landmarks) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const startGame = () => {
    const shuffled = shuffleArray(landmarks)
    setShuffledLandmarks(shuffled)
    setGameState('playing')
    setCurrentLandmarkIndex(0)
    setScore(0)
    setTimeLeft(5)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameStartTime(Date.now())
    setQuestionStartTime(Date.now())
    setTotalTimeTaken(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return

    const timeTaken = Date.now() - questionStartTime
    setTotalTimeTaken(prev => prev + timeTaken)

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === currentLandmark.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setCorrectAnswersCount(prev => prev + 1)
      const timeBonus = Math.max(0, timeLeft - 5) * 2
      const difficultyBonus = currentLandmark.points
      const totalPoints = difficultyBonus + timeBonus
      setScore(prev => prev + totalPoints)
      playSound('correct')
    } else {
      playSound('wrong')
    }

    setShowResult(true)
  }

  const handleTimeUp = () => {
    const timeTaken = Date.now() - questionStartTime
    setTotalTimeTaken(prev => prev + timeTaken)
    setIsCorrect(false)
    setShowResult(true)
    playSound('wrong')
  }

  const nextQuestion = () => {
    if (currentLandmarkIndex < shuffledLandmarks.length - 1) {
      setCurrentLandmarkIndex(currentLandmarkIndex + 1)
      setSelectedAnswer(null)
      setTimeLeft(5)
      setShowResult(false)
      setQuestionStartTime(Date.now())
    } else {
      finishGame()
    }
  }

  const finishGame = () => {
    const totalGameTime = Date.now() - gameStartTime
    const correctAnswers = shuffledLandmarks
      .slice(0, currentLandmarkIndex + 1)
      .filter(
        (_, index) => selectedAnswer === shuffledLandmarks[index]?.correctAnswer
      ).length

    const newStats = {
      totalGames: gameStats.totalGames + 1,
      bestScore: Math.max(gameStats.bestScore, score),
      totalCorrect: gameStats.totalCorrect + correctAnswers,
      averageTime: Math.round(
        (gameStats.averageTime * gameStats.totalGames + totalGameTime) /
          (gameStats.totalGames + 1)
      ),
    }

    saveStats(newStats)
    setGameState('finished')
    playSound('finish')
  }

  const resetGame = () => {
    setGameState('welcome')
    setCurrentLandmarkIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const shareResults = async () => {
    const text = `🏛️ لقد حصلت على ${score} نقطة في لعبة "الوجهة الضبابية"!\n🎯 اكتشف معالم القصيم السياحية معنا`

    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'الوجهة الضبابية',
          text: text,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text + '\n' + window.location.href)
        alert('تم نسخ النتيجة للحافظة!')
      } catch (err) {
        console.log('Clipboard not supported')
      }
    }
  }

  // شاشة الترحيب
  if (gameState === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 lg:p-6">
        <div className="max-w-7xl w-full">
          <Card className="heritage-card shadow-2xl overflow-hidden animate-fade-in">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              {/* الشعار الرئيسي */}
              <div className="mb-8 lg:mb-10 animate-bounce-in">
                <HeritageLogo size="lg" showText={false} />

                {/* النص منفصل مع تحسينات */}
                <div className="text-center mt-8 space-y-4">
                  <h1
                    className="text-4xl lg:text-6xl font-bold gradient-text mb-4 glitch-effect animate-fade-in tracking-wide"
                    data-text="الوجهة الضبابية"
                  ></h1>

                  <Badge
                    variant="secondary"
                    className="text-lg lg:text-xl px-6 py-3 mt-4 bg-foggy-gray medium-brown-text font-bold rounded-full shadow-lg"
                  >
                    {landmarks.length} معلم سياحي مميز
                  </Badge>
                </div>
              </div>

              {/* شرح اللعبة */}
              <div className="card-gradient rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8 text-right animate-slide-up border-2 foggy-gray-border">
                <h2 className="text-xl lg:text-2xl font-bold medium-brown-text mb-4 text-center">
                  طريقة اللعب:
                </h2>
                <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 dark-brown-bg rounded-full flex items-center justify-center text-white font-bold mb-3">
                      <Eye className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h3 className="font-bold text-base lg:text-lg mb-2 medium-brown-text">
                      شاهد الصورة
                    </h3>
                    <p className="medium-brown-text text-sm lg:text-base">
                      ستظهر لك صورة ضبابية لمعلم سياحي في القصيم
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 dark-brown-bg rounded-full flex items-center justify-center text-white font-bold mb-3">
                      <Camera className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h3 className="font-bold text-base lg:text-lg mb-2 medium-brown-text">
                      اختر الإجابة
                    </h3>
                    <p className="medium-brown-text text-sm lg:text-base">
                      لديك 5 ثواني لاختيار الإجابة الصحيحة من 3 خيارات
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 dark-brown-bg rounded-full flex items-center justify-center text-white font-bold mb-3">
                      <MapPin className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h3 className="font-bold text-base lg:text-lg mb-2 medium-brown-text">
                      تعلم واستمتع
                    </h3>
                    <p className="medium-brown-text text-sm lg:text-base">
                      احصل على معلومات مفيدة عن كل معلم واجمع النقاط
                    </p>
                  </div>
                </div>
              </div>

              {/* الأزرار */}
              <div className="space-y-4">
                <Button
                  onClick={startGame}
                  size="lg"
                  className="w-full sm:w-auto palm-button px-6 lg:px-8 py-3 lg:py-4 text-lg lg:text-xl font-bold rounded-2xl"
                >
                  <Play className="w-5 h-5 lg:w-6 lg:h-6 ml-2" />
                  ابدأ اللعبة الآن
                </Button>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => {
                      setSoundEnabled(!soundEnabled)
                      if (typeof window !== 'undefined') {
                        localStorage.setItem(
                          'qassim-game-sound',
                          JSON.stringify(!soundEnabled)
                        )
                      }
                    }}
                    variant="outline"
                    size="lg"
                    className="px-4 py-2 rounded-xl border-2 foggy-gray-border medium-brown-text hover:bg-foggy-gray"
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5" />
                    ) : (
                      <VolumeX className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  {
    gameState === 'landing' && (
      <main className="bg-white text-[#1B1F5C] font-sans">
        {/* 🔵 الشعار */}
        <header className="py-6 flex justify-center">
          <div className="w-36 h-36 rounded-full overflow-hidden relative select-none pointer-events-none">
            <img
              src="/qw.png"
              alt="Qassim Tech Logo"
              draggable={false}
              onContextMenu={e => e.preventDefault()}
            />
          </div>
        </header>

        {/* 🔵 قسم عن اللعبة قبل العنوان */}
        <section className="py-10 px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">عن اللعبة</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            الوجهة الضبابية هي لعبة تفاعلية تعليمية تهدف لتعزيز المعرفة السياحية
            والثقافية عن منطقة القصيم، من خلال استكشاف صور مغبشة لمعالم المنطقة
            بطريقة ممتعة وتنافسية.
          </p>
        </section>

        {/* 🔵 الخلفية الكحلية مع العنوان والزر */}
        <section className="bg-[#1B1F5C] text-white flex flex-col items-center justify-center text-center py-24 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-sm mb-4">
            الوجهة الضبابية
          </h1>
          <p className="text-lg md:text-xl mb-6">
            اكتشف معالم القصيم بطريقة مبتكرة وممتعة!
          </p>
          <button
            onClick={() => setGameState('welcome')}
            className="bg-[#00B5B8] text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transition shadow-lg"
          >
            ابدأ اللعبة
          </button>
        </section>

        {/* 🔵 الفوتر ... */}
        {/* يمكنك الإبقاء على الفوتر كما هو أو أضيفه لك إذا رغبت */}
      </main>
    )
  }

  // شاشة اللعبة
  if (gameState === 'playing') {
    const progress =
      ((currentLandmarkIndex + 1) / shuffledLandmarks.length) * 100

    return (
      <div className="min-h-screen p-2 sm:p-4 game-container">
        <div className="max-w-6xl mx-auto">
          {/* شريط التقدم والمعلومات */}
          <div className="mb-4 space-y-3">
            <div className="heritage-card rounded-2xl p-3 lg:p-4 shadow-lg animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="text-sm lg:text-base px-3 lg:px-4 py-1 lg:py-2 font-bold bg-foggy-gray medium-brown-text"
                  >
                    <Star className="w-4 h-4 lg:w-5 lg:h-5 ml-1" />
                    {score} نقطة
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-sm lg:text-base px-3 lg:px-4 py-1 lg:py-2 font-bold foggy-gray-border medium-brown-text"
                  >
                    {currentLandmarkIndex + 1} / {shuffledLandmarks.length}
                  </Badge>
                </div>

                {/* عداد النخلة */}
                <div className="flex items-center justify-center scale-75 sm:scale-100">
                  <PalmTimer timeLeft={timeLeft} totalTime={4} />
                </div>
              </div>
              <Progress value={progress} className="h-2 lg:h-3" />
              <div className="text-center mt-2 medium-brown-text font-semibold text-sm">
                التقدم: {Math.round(progress)}%
              </div>
            </div>
          </div>

          <Card className="heritage-card shadow-2xl overflow-hidden animate-slide-up">
            <CardContent className="p-0">
              {/* الصورة */}
              <div className="relative overflow-hidden">
                <img
                  src={currentLandmark.image || '/placeholder.svg'}
                  alt="معلم سياحي"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  style={{
                    filter: showResult
                      ? 'blur(0px)'
                      : currentLandmark.points >= 9
                      ? 'blur(4px)'
                      : currentLandmark.points >= 6
                      ? 'blur(3px)'
                      : currentLandmark.points >= 3
                      ? 'blur(2px)'
                      : 'blur(1px)',
                    transition: 'filter 1s ease',
                  }}
                />

                {!showResult && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                )}

                {/* مؤشر الصعوبة */}
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs lg:text-sm px-2 lg:px-3 py-1 font-bold ${
                      currentLandmark.difficulty === 'سهل'
                        ? 'bg-green-100 text-green-800'
                        : currentLandmark.difficulty === 'متوسط'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {currentLandmark.difficulty} • {currentLandmark.points} نقطة
                  </Badge>
                </div>

                {/* شعار الكاميرا */}
                <div className="absolute top-2 left-2">
                  <GlitchCamera size="sm" animated={!showResult} />
                </div>
              </div>

              <div className="p-4 lg:p-6">
                {/* النتيجة */}
                {showResult && (
                  <div
                    className={`text-center mb-4 lg:mb-6 p-4 lg:p-6 rounded-2xl transition-all duration-500 animate-bounce-in ${
                      isCorrect
                        ? 'card-gradient border-2 border-green-400 text-green-800'
                        : 'heritage-card border-2 border-red-400 text-red-800'
                    }`}
                  >
                    <div className="text-2xl lg:text-3xl font-bold mb-3">
                      {isCorrect ? '🎉 إجابة صحيحة!' : '❌ إجابة خاطئة'}
                    </div>
                    <h3 className="text-lg lg:text-2xl font-bold mb-3 medium-brown-text">
                      {currentLandmark.name}
                    </h3>
                    <p className="text-sm lg:text-base leading-relaxed mb-3 medium-brown-text">
                      {currentLandmark.info}
                    </p>
                    {isCorrect && (
                      <div className="flex flex-wrap justify-center gap-2 text-sm">
                        <Badge
                          variant="secondary"
                          className="px-2 py-1 bg-foggy-gray medium-brown-text"
                        >
                          نقاط الصعوبة: {currentLandmark.points}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="px-2 py-1 bg-green-100 text-green-800"
                        >
                          مكافأة الوقت: {Math.max(0, timeLeft - 5) * 2}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                {/* الخيارات */}
                {!showResult && (
                  <div className="space-y-3 animate-fade-in">
                    <h3 className="text-lg lg:text-2xl font-bold text-center medium-brown-text mb-4">
                      ما هو هذا المعلم السياحي؟
                    </h3>
                    {currentLandmark.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        variant="outline"
                        className="w-full p-4 lg:p-6 text-sm lg:text-lg font-semibold text-right hover:card-gradient hover:foggy-gray-border transition-all duration-300 transform hover:scale-[1.02] border-2 foggy-gray-border medium-brown-text"
                        disabled={selectedAnswer !== null}
                      >
                        <span className="flex-1">{option}</span>
                        <div className="w-6 h-6 lg:w-8 lg:h-8 dark-brown-bg rounded-full flex items-center justify-center text-white font-bold mr-2">
                          {index + 1}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}

                {/* زر المتابعة */}
                {showResult && (
                  <div className="text-center mt-4 lg:mt-6">
                    <Button
                      onClick={nextQuestion}
                      size="lg"
                      className="palm-button px-6 lg:px-8 py-3 lg:py-4 text-lg lg:text-xl font-bold rounded-2xl"
                    >
                      {currentLandmarkIndex < shuffledLandmarks.length - 1
                        ? 'السؤال التالي'
                        : 'عرض النتائج'}
                      <Play className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // شاشة النتائج النهائية
  if (gameState === 'finished') {
    const maxPossibleScore = shuffledLandmarks.reduce(
      (sum, landmark) => sum + landmark.points + 10,
      0
    )
    const percentage = Math.round(
      (correctAnswersCount / shuffledLandmarks.length) * 100
    )
    let message = ''
    let bgColor = ''
    let emoji = ''

    if (percentage >= 80) {
      message = 'ممتاز! أنت خبير في معالم القصيم التراثية'
      bgColor = 'card-gradient'
      emoji = '🏆'
    } else if (percentage >= 60) {
      message = 'جيد جداً! لديك معرفة جيدة بالمنطقة'
      bgColor = 'heritage-card'
      emoji = '👍'
    } else if (percentage >= 40) {
      message = 'جيد! تحتاج لمزيد من الاستكشاف'
      bgColor = 'heritage-card'
      emoji = '💪'
    } else {
      message = 'حاول مرة أخرى لتتعرف أكثر على معالم القصيم'
      bgColor = 'heritage-card'
      emoji = '🎯'
    }

    ;<div className="text-xl lg:text-2xl font-bold text-green-800">
      {correctAnswersCount}
    </div>

    return (
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
        <Card className="max-w-4xl w-full heritage-card shadow-2xl animate-bounce-in">
          <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="mb-6 lg:mb-8">
              <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-4 dark-brown-bg rounded-full flex items-center justify-center shadow-lg text-4xl lg:text-6xl">
                {emoji}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold gradient-text mb-3">
                انتهت اللعبة!
              </h1>
            </div>

            <div
              className={`${bgColor} rounded-2xl p-4 lg:p-6 mb-6 border-2 foggy-gray-border`}
            >
              <div className="text-4xl lg:text-6xl font-bold medium-brown-text mb-3">
                {score}
              </div>
              <div className="text-xl lg:text-2xl font-bold medium-brown-text mb-3">
                نقطة
              </div>
              <div className="text-lg lg:text-xl font-bold medium-brown-text mb-3">
                {percentage}%
              </div>
              <p className="text-base lg:text-lg medium-brown-text font-semibold">
                {message}
              </p>
            </div>

            {/* إحصائيات اللعبة */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
              <div className="heritage-card rounded-xl p-3 lg:p-4 border-2 foggy-gray-border">
                <div className="text-xl lg:text-2xl font-bold medium-brown-text">
                  {currentLandmarkIndex + 1}
                </div>
                <div className="medium-brown-text font-semibold text-xs lg:text-sm">
                  أسئلة مجابة
                </div>
              </div>
              <div className="heritage-card rounded-xl p-3 lg:p-4 border-2 border-green-200">
                <div className="text-xl lg:text-2xl font-bold text-green-800">
                  {correctAnswersCount}
                </div>
                <div className="text-green-600 font-semibold text-xs lg:text-sm">
                  إجابات صحيحة
                </div>
              </div>
              <div className="heritage-card rounded-xl p-3 lg:p-4 border-2 border-blue-200">
                <div className="text-xl lg:text-2xl font-bold text-blue-800">
                  {Math.round(totalTimeTaken / 1000)}ث
                </div>
                <div className="text-blue-600 font-semibold text-xs lg:text-sm">
                  إجمالي الوقت
                </div>
              </div>
              <div className="heritage-card rounded-xl p-3 lg:p-4 border-2 border-purple-200">
                <div className="text-xl lg:text-2xl font-bold text-purple-800">
                  {score > gameStats.bestScore ? '🆕' : gameStats.bestScore}
                </div>
                <div className="text-purple-600 font-semibold text-xs lg:text-sm">
                  أفضل نتيجة
                </div>
              </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={startGame}
                  size="lg"
                  className="palm-button px-6 lg:px-8 py-3 lg:py-4 text-lg lg:text-xl font-bold rounded-2xl"
                >
                  <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6 ml-2" />
                  العب مرة أخرى
                </Button>

                <Button
                  onClick={shareResults}
                  variant="outline"
                  size="lg"
                  className="px-6 lg:px-8 py-3 lg:py-4 text-lg lg:text-xl font-bold rounded-2xl border-2 foggy-gray-border medium-brown-text hover:card-gradient bg-transparent"
                >
                  <Share2 className="w-5 h-5 lg:w-6 lg:h-6 ml-2" />
                  شارك النتيجة
                </Button>
              </div>

              <Button
                onClick={resetGame}
                variant="ghost"
                size="lg"
                className="w-full px-6 py-3 text-lg font-bold rounded-xl hover:bg-foggy-gray medium-brown-text"
              >
                <Home className="w-5 h-5 ml-2" />
                العودة للبداية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
