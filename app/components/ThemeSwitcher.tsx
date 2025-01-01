import * as React from 'react'
import { Monitor, Moon, Sun, SunMoon } from 'lucide-react'
import { useFetcher } from '@remix-run/react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'

const themes = [
  {
    id: 'light',
    label: 'Claro',
    icon: <Sun className="h-4 w-4" />
  },
  {
    id: 'dark',
    label: 'Oscuro',
    icon: <Moon className="h-4 w-4" />
  },
  {
    id: 'system',
    label: 'Sistema',
    icon: <Monitor className="h-4 w-4" />
  }
] as const

export function ThemeSwitcher({ theme }: { theme: string }) {
  const fetcher = useFetcher()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <SunMoon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-1">
        {themes.map(({ id, label, icon }) => (
          <fetcher.Form
            key={id}
            method="post"
            action="/theme"
            onChange={() => {
              setOpen(false)
            }}
          >
            <input type="hidden" name="theme" value={id} />
            <Button
              type="submit"
              variant="ghost"
              className={`w-full justify-start gap-2 ${theme === id
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              {icon}
              <span>{label}</span>
            </Button>
          </fetcher.Form>
        ))}
      </PopoverContent>
    </Popover>
  )
}
