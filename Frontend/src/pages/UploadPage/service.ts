import axios from 'axios'
import asyncPool from '@/utils/asyncPool';
import SparkMD5 from 'spark-md5'

const spark = new SparkMD5.ArrayBuffer()

/**
 * 文件切片
 * @param {file} file
 */
export const createFileChunk = (file: any) => {
  const fileChunkList = []
  const CHUNK_SIZE = 2097152 // 切片大小为 2M

  for (let start = 0; start < file.size; start += CHUNK_SIZE) {
    fileChunkList.push({
      file: file.slice(start, start + CHUNK_SIZE)
    })
  }

  return fileChunkList
}

/**
 * 创建文件的 md5 标识
 * @param {array} fileChunkList
 */
export const getFileMd5 = (fileChunkList: any) => {
  let count = 0
  const totalCount = fileChunkList.length
  const fileReader = new FileReader()
  return new Promise((resolve, reject) => {
    fileReader.onload = e => {
      if (e.target && e.target.result) {
        count += 1
        spark.append(e.target.result)
      }
      if (count < totalCount) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }

    fileReader.onerror = function () {
      reject({
        message: '文件读取失败',
      })
    }

    const loadNext = () => {
      fileReader.readAsArrayBuffer(fileChunkList[count]?.file)
    }

    loadNext()
  })
}

const getChunk = (md5: any, fileExtension: any) => {
  let regex = /\/(\w+)$/;
  let match = fileExtension.match(regex);
  let result = "";

  if (match) {
    result = match[1]; // 匹配的结果将存储在 match[1] 中
  }
  return axios({
    url: '/api/file/getUploadId', // 获取当前文件分片数量
    method: "get",
    params: {
      md5,
      fileExtension: result,
    },
    headers: {
      'Authorization': localStorage.getItem('access_token'),
    },
    // isJson: true,
  })
}

/**
 * 上传文件（断点续传）
 * @param {*} fileMd5Value
 * @param {*} fileName
 * @param {*} fileChunkList
 */
export const uploadFile = async (fileMd5Value: any, fileName: any, fileChunkList: any, fileType: any, files: any, progressBar: any) => {
  const total = fileChunkList.length
  let { chunks, uploadId } = (await getChunk(fileMd5Value, fileType))?.data?.data
  let fileCurrent = chunks.length > 0 ? chunks[chunks.length - 1] + 1 : 1
  let progressCurrent = fileCurrent;

  fileChunkList = fileChunkList.map((fileChunk: any) => {
    return new File([fileChunk.file], fileName, {
      type: fileType,
      lastModified: Date.now()
    })
  })

  // eslint-disable-next-line
  for await (const _ of asyncPool(5, fileChunkList.slice(fileCurrent - 1, total - 1), (file: any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('uploadId', uploadId)
    formData.append('totalChunk', total)
    formData.append('index', fileCurrent)

    fileCurrent++;
    return axios({
      url: '/api/file/uploadChunk', // 断点续传
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': localStorage.getItem('access_token'),
      },
    }).then(() => {
      let percent = progressCurrent / fileChunkList.length * 100 | 0
      progressBar && progressBar(files.file, percent)
      progressCurrent++
    })
  })) { }

  return new Promise((resolve, reject) => {
    const formData = new FormData()
    const file = fileChunkList[total - 1]

    formData.append('file', file)
    formData.append('uploadId', uploadId)
    formData.append('totalChunk', total)
    formData.append('index', fileCurrent)

    axios({
      url: '/api/file/uploadChunk', // 断点续传
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': localStorage.getItem('access_token'),
      },
    }).then(res => {
      console.log(res);
      if (res && res.data.code === 0) {
        progressBar && progressBar(files.file, 100)
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
  })
}

export const videoUpload = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/video/upload',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('access_token'),
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }).catch(err => {
    console.log(err)
  });
};

