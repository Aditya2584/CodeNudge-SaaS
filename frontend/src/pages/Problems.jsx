import React, { useState, useEffect, useMemo } from 'react';
import { problemService } from '../services/problem.service';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Play, 
  CheckCircle2, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 6;

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter & Control States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('number'); // 'number' | 'retention' | 'difficulty' | 'title'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProblems = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await problemService.getProblems();
      setProblems(data || []);
    } catch (err) {
      console.error('Failed to fetch problems:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleMarkRevised = async (id) => {
    setProblems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Completed', retentionScore: 100 } : item))
    );
    try {
      await problemService.markRevised(id);
    } catch (err) {
      console.error('Failed to mark as revised:', err);
    }
  };

  // Filtering & Sorting Logic
  const filteredProblems = useMemo(() => {
    return problems
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.number.toString().includes(searchQuery);

        const matchesDifficulty =
          selectedDifficulty === 'All' || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

        const matchesStatus =
          selectedStatus === 'All' || p.status.toLowerCase() === selectedStatus.toLowerCase();

        return matchesSearch && matchesDifficulty && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'number') return a.number - b.number;
        if (sortBy === 'retention') return a.retentionScore - b.retentionScore;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'difficulty') {
          const rank = { Easy: 1, Medium: 2, Hard: 3 };
          return rank[b.difficulty] - rank[a.difficulty];
        }
        return 0;
      });
  }, [problems, searchQuery, selectedDifficulty, selectedStatus, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE) || 1;
  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProblems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProblems, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDifficulty, selectedStatus, sortBy]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-20 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
        <div className="h-14 rounded-xl bg-surface-hover/60 border border-white/[0.08]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-56 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={fetchProblems} title="Failed to load problem vault" />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="heading-2 flex items-center gap-2.5">
            Problem Vault
            <Badge variant="primary" size="sm">
              {filteredProblems.length} Total
            </Badge>
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Manage your solved LeetCode problems, decay metrics, and revision schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid vs Table View Switcher */}
          <div className="p-1 rounded-xl bg-surface/80 border border-white/[0.08] flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted hover:text-white'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted hover:text-white'
              }`}
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER & CONTROL BAR */}
      <div className="p-4 rounded-2xl bg-surface/60 border border-white/[0.08] backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <Input
            placeholder="Search problems, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 bg-background/60 p-1 rounded-xl border border-white/[0.06]">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-muted hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-surface border border-white/[0.1] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Due">Due for Review</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Sort Control */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface border border-white/[0.1] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="number">Sort by Number</option>
            <option value="retention">Sort by Memory Decay</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* CONTENT VIEWS */}
      {filteredProblems.length === 0 ? (
        <EmptyState
          title="No problems found"
          description="No problem matches your filter criteria. Try resetting search or filter options."
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
              }}
            >
              Reset Filters
            </Button>
          }
        />
      ) : viewMode === 'grid' ? (
        /* GRID CARDS VIEW */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedProblems.map((problem) => (
            <motion.div
              key={problem.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <Card variant="glass" className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-muted">#{problem.number}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          problem.difficulty === 'Easy'
                            ? 'easy'
                            : problem.difficulty === 'Hard'
                            ? 'hard'
                            : 'medium'
                        }
                        size="sm"
                      >
                        {problem.difficulty}
                      </Badge>
                      <Badge
                        variant={
                          problem.status === 'Due'
                            ? 'warning'
                            : problem.status === 'Completed'
                            ? 'success'
                            : 'outline'
                        }
                        size="sm"
                      >
                        {problem.status}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="heading-3 text-base mb-2 hover:text-primary transition-colors cursor-pointer">
                    {problem.title}
                  </h3>

                  <p className="text-xs text-muted mb-4">{problem.topic}</p>

                  {/* Retention Memory Decay Bar */}
                  <div className="space-y-1.5 mb-6">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted font-medium">Retention Score</span>
                      <span
                        className={`font-mono font-bold ${
                          problem.retentionScore > 80
                            ? 'text-emerald-400'
                            : problem.retentionScore > 60
                            ? 'text-amber-400'
                            : 'text-red-400'
                        }`}
                      >
                        {problem.retentionScore}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          problem.retentionScore > 80
                            ? 'bg-emerald-400'
                            : problem.retentionScore > 60
                            ? 'bg-amber-400'
                            : 'bg-red-400'
                        }`}
                        style={{ width: `${problem.retentionScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
                  {problem.status === 'Completed' ? (
                    <Button variant="ghost" size="sm" className="w-full" disabled>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" /> Revised
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handleMarkRevised(problem.id)}
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      >
                        Mark Revised
                      </Button>
                      <a href={problem.url} target="_blank" rel="noreferrer" className="flex-1">
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full text-xs"
                          leftIcon={<Play className="w-3.5 h-3.5" />}
                        >
                          Solve
                        </Button>
                      </a>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* TABLE VIEW */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-surface border border-white/[0.08] overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-hover/80 text-muted uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">#</th>
                  <th className="py-3.5 px-4 font-semibold">Problem Title</th>
                  <th className="py-3.5 px-4 font-semibold">Difficulty</th>
                  <th className="py-3.5 px-4 font-semibold">Topic Tag</th>
                  <th className="py-3.5 px-4 font-semibold">Retention</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {paginatedProblems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-4 font-mono font-bold text-muted">#{problem.number}</td>
                    <td className="py-4 px-4 font-semibold text-white">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        {problem.title}
                        <ExternalLink className="w-3 h-3 text-muted" />
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          problem.difficulty === 'Easy'
                            ? 'easy'
                            : problem.difficulty === 'Hard'
                            ? 'hard'
                            : 'medium'
                        }
                        size="sm"
                      >
                        {problem.difficulty}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-muted">{problem.topic}</td>
                    <td className="py-4 px-4 font-mono font-bold">
                      <span
                        className={
                          problem.retentionScore > 80
                            ? 'text-emerald-400'
                            : problem.retentionScore > 60
                            ? 'text-amber-400'
                            : 'text-red-400'
                        }
                      >
                        {problem.retentionScore}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          problem.status === 'Due'
                            ? 'warning'
                            : problem.status === 'Completed'
                            ? 'success'
                            : 'outline'
                        }
                        size="sm"
                      >
                        {problem.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {problem.status !== 'Completed' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleMarkRevised(problem.id)}
                            leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          >
                            Revised
                          </Button>
                        )}
                        <a href={problem.url} target="_blank" rel="noreferrer">
                          <Button variant="primary" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />}>
                            Solve
                          </Button>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PAGINATION CONTROLS */}
      {filteredProblems.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08] text-xs text-muted">
          <span>
            Showing <strong className="text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> to{' '}
            <strong className="text-white">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProblems.length)}
            </strong>{' '}
            of <strong className="text-white">{filteredProblems.length}</strong> problems
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>
            <span className="px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-white font-mono">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;
