'use client'
import React, { useEffect, useState, Fragment } from 'react'
import TableList from '@/components/table'
import Search from '@/components/search-bar'
import Pagination from '@/components/pagination'
import { TbListDetails } from 'react-icons/tb'
import { VscSettings } from 'react-icons/vsc'
import { RiRefreshLine } from 'react-icons/ri'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import _ from 'lodash'
import axios from 'axios'

/* ================= TYPES ================= */
export type TahsinTahfidz = {
  id: string
  nomor: number
  nama_siswa: string
  asal_sekolah: string
  jalur_pendaftaran: string
  penguji: string
  catatan: string
  istiadzah: number
  basmallah: number
  makhrijul_huruf: number
  tanwin: number
  sukun: number
  bacaan_panjang: number
  rata_rata_tajwid: number
  kelancaran: number
  hafalan?: string
  tempat_mengaji: string
  hasil_tajwid?: string
  hasil_kelancaran?: string
  hasil_hafalan?: string
  rangkuman?: string
}

type DataCount = {
  page: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  dataLength: number
}

/* ================= MAIN COMPONENT ================= */
export default function TahsinTahfidzTable() {
  const [dataTahta, setData] = useState<TahsinTahfidz[]>([])
  const [dataPage, setPageData] = useState<DataCount | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [rotate, setRotate] = useState(false)
  const [detail, setDetail] = useState(false)
  const [selected, setSelected] = useState<TahsinTahfidz | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  /* ================= FETCH DATA ================= */
  const fetchData = async (pageNumber: number = 1) => {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:5000/api/tahta?page=${pageNumber}&limit=10`)
      const response = res.data
      setData(response.data)
      setPageData({
        page: response.page,
        total: response.total,
        totalPages: response.totalPages,
        hasNextPage: response.hasNextPage,
        hasPrevPage: response.hasPrevPage,
        limit: response.limit,
        dataLength: response.data.length
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500) // 300ms delay

    return () => clearTimeout(handler)
  }, [searchTerm])

  const refresh = () => {
    setRotate(!rotate)
    fetchData(page)
  }

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const handleShowDetail = (item: TahsinTahfidz) => {
    setSelected(item)
    setDetail(true)
  }

  const handleCloseDetail = () => {
    setSelected(null)
    setDetail(false)
  }

  /* ================= UPDATE DATA ================= */
  const handleUpdate = async (updated?: TahsinTahfidz) => {
    if (!updated) return
    // Optimistic update
    setData(prev =>
      prev.map(item => (item.id === updated.id ? updated : item))
    )
    try {
      await axios.patch(`http://localhost:5000/api/tahta/${updated.id}`, updated)
    } catch (error) {
      console.error('Update error:', error)
      alert('Gagal menyimpan perubahan')
    }
  }

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    { key: 'nomor', label: 'No', className: 'text-center w-12' },
    { key: 'nama_siswa', label: 'Nama', className: 'w-48' },
    { key: 'asal_sekolah', label: 'Asal Sekolah', className: 'hidden md:table-cell w-40' },
    { key: 'jalur_pendaftaran', label: 'Jalur', className: 'hidden md:table-cell text-center w-32' },
    { key: 'penguji', label: 'Penguji', className: 'hidden md:table-cell w-32' },
    { key: 'catatan', label: 'Catatan', className: 'hidden md:table-cell w-64' },
    { key: 'aksi', label: 'Aksi', className: 'text-center w-1/4 md:w-1/8' },
  ]

  const renderRow = (item: TahsinTahfidz) => (
    <tr key={item.id} className="text-xs border-b border-slate-200 odd:bg-slate-50 even:bg-white hover:bg-[#d3bae6] hover:text-white">
      <td className="text-center p-2">{item.nomor}</td>
      <td className="font-semibold p-2 truncate">{item.nama_siswa}</td>
      <td className="font-semibold p-2 truncate">{item.asal_sekolah}</td>
      <td className="text-center p-2">{item.jalur_pendaftaran}</td>
      <td className="hidden md:table-cell p-2">{item.penguji}</td>
      <td className="hidden md:table-cell p-2 truncate max-w-xs">{item.catatan || '-'}</td>
      <td>
        <div className="flex justify-center gap-2">
          <abbr title="Detail" onClick={() => handleShowDetail(item)} className="bg-accent rounded-full hover:bg-primary cursor-pointer">
            <TbListDetails size={22} className="p-1 text-white" />
          </abbr>
        </div>
      </td>
    </tr>
  )

  /* ================= RENDER ================= */
  return (
    <div className="relative z-0">
      <div className="border border-t-0 rounded-md rounded-tl-none bg-white border-slate-300">
        {/* HEADER */}
        {!detail && (
          <div className="flex justify-between items-center">
            <div className="w-80 px-3 py-2">
              <Search filter={(v: string) => setSearchTerm(v)} />

            </div>
            <div className="flex items-center gap-3 px-3">
              <span className="bg-primary text-white p-2 rounded-full cursor-pointer">
                <VscSettings />
              </span>
              <span onClick={refresh} className={`cursor-pointer transition-all duration-700 ${rotate ? 'rotate-180' : ''}`}>
                <RiRefreshLine />
              </span>
            </div>
          </div>
        )}

        {/* CONTENT */}
        {!detail ? (
          loading ? (
            <div className="text-center py-3 font-semibold">Loading...</div>
          ) : dataTahta.length === 0 ? (
            <div className="text-center py-3 font-semibold">Data tidak ditemukan</div>
          ) : (
            <TableList
              columns={columns}
              renderRow={renderRow}
              data={dataTahta.filter(item =>
                item.nama_siswa.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                item.asal_sekolah.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                item.jalur_pendaftaran.toLowerCase().includes(debouncedSearch.toLowerCase())
              )}
            />
          )
        ) : selected ? (
          <TahsinTahfidzDetail onSubmit={handleUpdate} data={selected} onClose={handleCloseDetail} />
        ) : null}
      </div>

      {/* PAGINATION */}
      {!detail && dataPage && (
        <Pagination dataCount={dataPage} onPageChange={handlePageChange} />
      )}
    </div>
  )
}

/* ================= DETAIL COMPONENT ================= */
// Masukkan seluruh detail Layer kamu di sini, termasuk Listbox, penilaian tajwid, hafalan, tempat mengaji, dll.
// Jangan ubah kode, biarkan semua logic dan Listbox tetap seperti aslinya
// Pastikan props onSubmit tetap memanggil handleUpdate

/* ================= DETAIL LAYER ================= */


const PENGUJI_OPTIONS = [
  'Ova Laela Muttaqiyah',
  'Tina Malinda',
  'Ghofta Shafa Mumtaz',
  'Rudi Firmansyah',
]

const TAJWID_FIELDS: (keyof TahsinTahfidz)[] = [
  'istiadzah',
  'basmallah',
  'makhrijul_huruf',
  'tanwin',
  'sukun',
  'bacaan_panjang',
]

const HAFALAN_OPTIONS = [
  'Perlu Bimbingan',
  'Cukup',
  'Baik',
  'Sangat Baik',
  'Jalur Tahfidz',
]


// FUnction helpers for descriptions
const getTajwidDescription = (form: TahsinTahfidz) => {
  const {
    nama_siswa,
    rata_rata_tajwid,
    istiadzah,
    basmallah,
    makhrijul_huruf,
    tanwin,
    sukun,
    bacaan_panjang,
  } = form

  const catatanKurang: string[] = []

  if (istiadzah <= 80) catatanKurang.push("Isti'adzah")
  if (basmallah <= 80) catatanKurang.push('Basmalah')
  if (makhrijul_huruf <= 80) catatanKurang.push('Makhrajul Huruf')
  if (tanwin <= 80) catatanKurang.push('Tanwin')
  if (sukun <= 80) catatanKurang.push('Sukun')
  if (bacaan_panjang <= 80) catatanKurang.push('Bacaan Panjang')

  const detail =
    catatanKurang.length > 0
      ? catatanKurang.join(', ')
      : 'tidak ada catatan tambahan'

  if (rata_rata_tajwid >= 88) {
    return `Alhamdulillah Ananda ${nama_siswa} secara dasar sudah baik dalam menerapkan hukum tajwid, tetap semangat untuk terus meningkatkan kefasihan dan konsistensi pada setiap bacaan.`
  }

  if (rata_rata_tajwid > 80) {
    return `Secara umum Ananda ${nama_siswa} cukup baik dalam menerapkan hukum tajwid, namun tetap perlu bimbingan, peningkatan, dan perbaikan terutama pada bacaan ${detail}.`
  }

  return `Ananda ${nama_siswa} perlu bimbingan lebih agar dapat menerapkan hukum bacaan tajwid dasar dengan baik dan benar, terutama pada bacaan ${detail}.`
}

const getKelancaranDescription = (form: TahsinTahfidz) => {
  const { kelancaran } = form

  if (kelancaran > 90) {
    return 'Ananda sudah lancar dalam membaca Al-Qur’an.'
  }

  if (kelancaran > 70) {
    return 'Ananda perlu meningkatkan kemampuan dalam membaca Al-Qur’an agar lebih lancar.'
  }

  return 'Ananda perlu bimbingan intensif agar dapat meningkatkan kemampuan dalam membaca Al-Qur’an.'
}

type HafalanLevel =
  | 'Perlu Bimbingan'
  | 'Cukup'
  | 'Baik'
  | 'Sangat Baik'
  | 'Jalur Tahfidz'

const getHafalanDescription = (
  nama: string,
  hafalan: HafalanLevel | string
) => {
  switch (hafalan) {
    case 'Perlu Bimbingan':
      return `Ananda ${nama} sedikit memiliki hafalan Al-Qur'an sehingga perlu bimbingan dan komitmen kuat supaya dapat menyesuaikan dengan pembelajaran nanti.`

    case 'Cukup':
      return `Ananda ${nama} memiliki beberapa hafalan Al-Qur'an, namun perlu usaha lebih untuk menambah hafalan supaya dapat menyesuaikan dengan pembelajaran.`

    case 'Baik':
      return `Ananda ${nama} memiliki hafalan Al-Qur'an yang cukup sebagai pondasi untuk mengikuti pembelajaran, namun tetap perlu usaha untuk menambah hafalan kedepannya.`

    case 'Sangat Baik':
      return `Ananda ${nama} sudah memiliki hafalan surat an-Naba' dan surat-surat pendek yang cukup sebagai pondasi untuk menyelesaikan harapan kelulusan, semoga Ananda tetap semangat dan istiqomah untuk terus melanjutkan hafalannya.`

    default:
      return `Masyaa Allah, Ananda ${nama} sudah memiliki hafalan juz 29 dan 30. Semoga Ananda dapat istiqomah dalam muraja'ah dan terus meningkatkan hafalan dan pemahaman ilmu Al-Qur'an.`
  }
}

const getRangkumanCatatan = (
  nama: string,
  tempatMengaji: string
) => {
  const hasTempatMengaji =
    tempatMengaji !== 'Tidak Ada'

  if (hasTempatMengaji) {
    return `Kami menyarankan agar Ananda ${nama} tetap mengaji di tempat yang selama ini diikuti supaya dapat menjadi penunjang pembelajaran tahsin dan tahfidz di SMPIT ALBANNA ke depan. Dan Ananda juga diharapkan terus muraja'ah hafalannya ketika dirumah. Barokallahu fikum.`
  }

  return `Kami menyarankan agar Ananda ${nama} mengusahakan mencari tempat mengaji di sekitar lingkungan rumah supaya dapat menjadi penunjang pembelajaran tahsin dan tahfidz di SMPIT ALBANNA ke depan. Dan Ananda juga diharapkan terus muraja'ah hafalannya ketika dirumah. Barokallahu fikum.`
}



function TahsinTahfidzDetail({
  data,
  onClose,
  onSubmit,
}: {
  data: TahsinTahfidz
  onClose: () => void
  onSubmit: (data: TahsinTahfidz) => void | Promise<void>  // <--- ubah sini
}) {
  const [form, setForm] = useState<TahsinTahfidz>(data)

  /* ================= AUTO HITUNG RATA-RATA ================= */
  useEffect(() => {
    const total = TAJWID_FIELDS.reduce(
      (sum, key) => sum + Number(form[key] || 0),
      0
    )
    const avg = Math.round(total / TAJWID_FIELDS.length)

    setForm(prev => ({
      ...prev,
      rata_rata_tajwid: avg,
    }))
  }, TAJWID_FIELDS.map(k => form[k]))

  const handleChange = (
    key: keyof TahsinTahfidz,
    value: string | number
  ) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const isInvalid =
    [...TAJWID_FIELDS, 'kelancaran'].some(
      key => Number(form[key as keyof TahsinTahfidz]) > 100
    )

  /* ================= UI HELPERS ================= */
  const badgeColor =
    form.rata_rata_tajwid < 70
      ? 'bg-red-100 text-red-600'
      : form.rata_rata_tajwid < 85
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-green-100 text-green-700'

  /* ================= RENDER ================= */
  return (
    <div className="relative w-full bg-white animate-fade-in">
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <div>
          <h2 className="font-bold text-lg text-primary">
            Detail & Penilaian Tahsin
          </h2>
          <p className="text-xs text-slate-500">
            Edit nilai tajwid dan catatan penguji
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Kembali
        </button>
      </div>

      <div className="p-6 space-y-6 text-sm">
        {/* ================= INFO SANTRI ================= */}
        <section>
          <h3 className="font-semibold text-slate-700 mb-3">
            Informasi Santri
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'nama_siswa', label: 'Nama' },
              { key: 'asal_sekolah', label: 'Asal Sekolah' },
              { key: 'jalur_pendaftaran', label: 'Jalur Pendaftaran' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-slate-500">
                  {label}
                </label>
                <input
                  readOnly
                  value={form[key as keyof TahsinTahfidz] as string}
                  className="w-full mt-1 bg-slate-100 border border-slate-200 rounded-md px-3 py-2 text-xs"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ================= NILAI TAJWID ================= */}
        <section>
          <h3 className="font-semibold text-slate-700 mb-3">
            Penilaian Tajwid
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TAJWID_FIELDS.map(key => (
              <div key={key}>
                <label className="text-xs font-semibold text-slate-500">
                  {key.replace(/_/g, ' ')}
                </label>
                <input
                  type="number"
                  max={100}
                  value={form[key]}
                  onChange={e => {
                    handleChange(key, Number(e.target.value))
                    handleChange('hasil_tajwid', getTajwidDescription(form))
                    handleChange('rangkuman', getRangkumanCatatan(form.nama_siswa, form.tempat_mengaji))
                  }
                  }
                  className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                />
              </div>
            ))}

            {/* RATA-RATA */}
            <div className="col-span-2 md:col-span-3 flex items-center gap-3 mt-2">
              <span className="text-xs font-semibold text-slate-600">
                Rata-rata Tajwid
              </span>
              <span
                className={`px-4 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
              >
                {form.rata_rata_tajwid}
              </span>
            </div>
          </div>
        </section>

        {/* ================= INFO TAMBAHAN ================= */}
        <section>
          <h3 className="font-semibold text-slate-700 mb-3">
            Informasi Tambahan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Kelancaran
              </label>
              <input
                type="number"
                value={form.kelancaran}
                onChange={e => {
                  handleChange('kelancaran', Number(e.target.value))
                  handleChange('hasil_kelancaran', getKelancaranDescription(form))
                  handleChange('rangkuman', getRangkumanCatatan(form.nama_siswa, form.tempat_mengaji))
                }
                }
                className="w-full mt-1 border rounded-md px-3 py-2 text-xs"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500">
                Hafalan
              </label>

              <Listbox
                value={form.hafalan}
                onChange={value => {
                  handleChange('hafalan', value)
                  handleChange('hasil_hafalan', getHafalanDescription(form.nama_siswa, value))
                  handleChange('rangkuman', getRangkumanCatatan(form.nama_siswa, form.tempat_mengaji))
                }

                }
              >
                <div className="relative">
                  {/* BUTTON */}
                  <Listbox.Button
                    className="
          relative w-full cursor-pointer rounded-xl
          bg-slate-100 px-4 py-2 pr-10 text-left text-xs
          text-slate-700
          shadow-[inset_2px_2px_5px_#cbd5e1,inset_-3px_-3px_7px_#ffffff]
          focus:outline-none focus:ring-2 focus:ring-primary
        "
                  >
                    <span className="block truncate">
                      {form.hafalan || 'Pilih Penilaian Hafalan'}
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <ChevronUpDownIcon className="h-4 w-4 text-slate-500" />
                    </span>
                  </Listbox.Button>

                  {/* OPTIONS */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="
            absolute z-20 mt-2 max-h-60 w-full overflow-auto
            rounded-xl bg-slate-100 py-1 text-xs
            shadow-[6px_6px_12px_#cbd5e1,-6px_-6px_12px_#ffffff]
            focus:outline-none
          "
                    >
                      {HAFALAN_OPTIONS.map(option => (
                        <Listbox.Option
                          key={option}
                          value={option}
                          className={({ active }) =>
                            `
                  relative cursor-pointer select-none px-4 py-2
                  ${active
                              ? 'bg-primary text-white'
                              : 'text-slate-700'}
                `
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? 'font-semibold' : 'font-normal'
                                  }`}
                              >
                                {option}
                              </span>

                              {selected && (
                                <span className="absolute inset-y-0 right-3 flex items-center">
                                  <CheckIcon className="h-4 w-4" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>


            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500">
                Tempat Mengaji
              </label>

              <Listbox
                value={form.tempat_mengaji}
                onChange={value => {
                  handleChange('tempat_mengaji', value)
                  handleChange('rangkuman', getRangkumanCatatan(form.nama_siswa, value))
                }
                }
              >
                <div className="relative">
                  {/* BUTTON */}
                  <Listbox.Button
                    className="
          relative w-full cursor-pointer rounded-xl
          bg-slate-100 px-4 py-2 pr-10 text-left text-xs
          text-slate-700
          shadow-[inset_2px_2px_5px_#cbd5e1,inset_-3px_-3px_7px_#ffffff]
          focus:outline-none focus:ring-2 focus:ring-primary
        "
                  >
                    <span className="block truncate">
                      {form.tempat_mengaji || 'Pilih'}
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <ChevronUpDownIcon className="h-4 w-4 text-slate-500" />
                    </span>
                  </Listbox.Button>

                  {/* OPTIONS */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="
            absolute z-20 mt-2 w-full rounded-xl
            bg-slate-100 py-1 text-xs
            shadow-[6px_6px_12px_#cbd5e1,-6px_-6px_12px_#ffffff]
            focus:outline-none
          "
                    >
                      {['Ada', 'Tidak Ada'].map(option => (
                        <Listbox.Option
                          key={option}
                          value={option}
                          className={({ active }) =>
                            `
                  relative cursor-pointer select-none px-4 py-2
                  ${active ? 'bg-primary text-white' : 'text-slate-700'}
                `
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? 'font-semibold' : 'font-normal'
                                  }`}
                              >
                                {option}
                              </span>

                              {selected && (
                                <span className="absolute inset-y-0 right-3 flex items-center">
                                  <CheckIcon className="h-4 w-4" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>


            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Penguji
              </label>

              <Listbox
                value={form.penguji}
                onChange={value => handleChange('penguji', value)}
              >
                <Listbox disabled={form.rata_rata_tajwid === 0}></Listbox>
                <div className="relative mt-1">
                  {/* BUTTON */}
                  <Listbox.Button
                    className="
          relative w-full cursor-pointer rounded-xl
          bg-slate-100 px-4 py-2 pr-10 text-left text-xs
          shadow-[inset_2px_2px_5px_#cbd5e1,inset_-3px_-3px_7px_#ffffff]
          focus:outline-none focus:ring-2 focus:ring-primary
        "
                  >
                    <span className="block truncate text-slate-700">
                      {form.penguji || 'Pilih Penguji'}
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <ChevronUpDownIcon
                        className="h-4 w-4 text-slate-500"
                      />
                    </span>
                  </Listbox.Button>

                  {/* OPTIONS */}
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="
            absolute z-20 mt-2 max-h-60 w-full overflow-auto
            rounded-xl bg-slate-100 py-1 text-xs
            shadow-[6px_6px_12px_#cbd5e1,-6px_-6px_12px_#ffffff]
            focus:outline-none
          "
                    >
                      {PENGUJI_OPTIONS.map(p => (
                        <Listbox.Option
                          key={p}
                          value={p}
                          className={({ active }) =>
                            `
                  relative cursor-pointer select-none px-4 py-2
                  ${active
                              ? 'bg-primary text-white'
                              : 'text-slate-700'}
                `
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? 'font-semibold' : 'font-normal'
                                  }`}
                              >
                                {p}
                              </span>

                              {selected && (
                                <span className="absolute inset-y-0 right-3 flex items-center">
                                  <CheckIcon className="h-4 w-4" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-500">
                Catatan
              </label>
              <textarea
                rows={3}
                value={form.catatan}
                onChange={e =>
                  handleChange('catatan', e.target.value)
                }
                className="w-full mt-1 border rounded-md px-3 py-2 text-xs"
              />
            </div>
          </div>
        </section>

        {/* Hasil */}
        <h3 className="font-semibold text-slate-700 mb-3">Hasil Penilaian</h3>
        <section className='flex justify-between gap-2'>


          <div
            className="
    mt-4 rounded-2xl p-4 text-xs leading-relaxed text-slate-700
    bg-slate-100
    shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff]
  "
          >
            <p className="font-semibold text-primary mb-2">
              Tajwid
            </p>

            <p
              className="text-slate-600">
              {getTajwidDescription(form)}
            </p>
          </div>
          <div
            className="
    mt-4 rounded-2xl p-4 text-xs leading-relaxed text-slate-700
    bg-slate-100
    shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff]
  "
          >
            <p className="font-semibold text-primary mb-2">
              Deskripsi Kelancaran
            </p>

            <p className="text-slate-600">
              {getKelancaranDescription(form)}
            </p>
          </div>


          <div
            className="
    mt-4 rounded-2xl p-4 text-xs leading-relaxed
    bg-slate-100 text-slate-700
    shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff]
  "
          >
            <p className="font-semibold text-primary mb-2">
              Deskripsi Hafalan
            </p>

            <p className="text-slate-600">
              {getHafalanDescription(form.nama_siswa, form.hafalan as any)}
            </p>
          </div>
        </section>

        {/* Rangkuman */}
        <section>
          <div
            className="
    mt-6 rounded-2xl p-5 text-xs leading-relaxed
    bg-slate-100
    shadow-[inset_4px_4px_8px_#cbd5e1,inset_-4px_-4px_8px_#ffffff]
  "
          >
            <p className="font-bold text-primary mb-2">
              Catatan
            </p>

            <p className="text-slate-600">
              {getRangkumanCatatan(form.nama_siswa, form.tempat_mengaji)}
            </p>
          </div>

        </section>

        {/* ================= ACTION ================= */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border text-sm hover:bg-slate-100"
          >
            Batal
          </button>
          <button

            onClick={() => {
              onSubmit(form)
              onClose()
            }}
            className={`px-5 py-2 rounded-md text-sm text-white
    ${isInvalid
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-primary hover:opacity-90'}
  `}
          >
            Simpan Perubahan
          </button>

        </div>
      </div>
    </div>
  )
}

