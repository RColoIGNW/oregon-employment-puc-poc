const log = console.log

export interface RequestOptions extends RequestInit {
  requireJSON?: boolean
}

export async function request<T>(
  url: string,
  options?: RequestOptions
): Promise<T>
export async function request(
  url: string,
  options?: RequestOptions
): Promise<string>

export async function request<T>(url: string, options?: RequestOptions) {
  log("request: fetching", url)

  const headers = new Headers()
  headers.append("Authorization", `Bearer ${localStorage.token || ""}`)
  headers.append("Content-Type", "application/json")

  let response
  try {
    response = await fetch(url, { headers, ...options })
  } catch (err) {
    log("request: network error making request", err)
    throw err
  }
  const result = await parseResponse<T>(response, options?.requireJSON)
  log("request: result", result)
  return result
}

export async function parseResponse<T>(
  res: Response,
  requireJSON?: boolean
): Promise<T>
export async function parseResponse(
  res: Response,
  requireJSON?: boolean
): Promise<string>

export async function parseResponse(res: Response, requireJSON?: boolean) {
  const text = await res.text()
  log("response status: ", res.status, text)
  if (res.status >= 300) {
    throw new Error(`${res.status} ${text}`)
  }
  try {
    return JSON.parse(text)
  } catch (e) {
    if (requireJSON) {
      throw new Error(`${res.status} ${text}`)
    }
  }
  return text
}
